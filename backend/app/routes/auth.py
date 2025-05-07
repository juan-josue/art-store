import re
import bcrypt

from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_email(email: str) -> bool:
    regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(regex, email) is not None
 

@auth_bp.route("/register", methods=['POST'])
def register():
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Get the data from the request
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Inout validation
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required."}), 400
    if not verify_email(email):
        return jsonify({"error": "Invalid email format."}), 400
    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters long."}), 400
    
    
    # Check if the email already exists
    response = supabase.table("users").select("*").eq("email", email).execute()
    if response.data:
        return jsonify({"error": "That email is not available."}), 400
    
    # Hash the password
    hashed_password = hash_password(password)
        
    # Insert the new user into the database    
    try:
        response = (
            supabase.table("users")
            .insert({
                "username": username,
                "email": email,
                "password_hash": hashed_password
            })
            .execute()
        )
        return jsonify(response.data), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/login", methods=['POST'])
def login():
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Get the data from the request
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Input validation
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400
    if not verify_email(email):
        return jsonify({"error": "Invalid email format."}), 400
    
    # Check if the user exists
    response = supabase.table("users").select("*").eq("email", email).execute()
    user = response.data[0] if response.data else None
    if not user:
        return jsonify({"error": "Invalid email or password."}), 401
    
    # Verify the password
    hashed_password = user['password_hash']
    if not bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
        return jsonify({"error": "Invalid email or password."}), 401
    
    # Create JWT token
    access_token = create_access_token(identity=str(user['id']))
    return jsonify(access_token=access_token), 200

@auth_bp.route("/me", methods=['GET'])
@jwt_required()
def me():
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Get the current user's ID
    user_id = get_jwt_identity()
    
    # Get the user from the database
    response = supabase.table("users").select("*").eq("id", user_id).execute()
    user = response.data[0] if response.data else None
    
    if not user:
        return jsonify({"error": "User not found."}), 404
    
    return jsonify(user), 200