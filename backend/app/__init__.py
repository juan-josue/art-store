import os, re
import bcrypt

from flask import Flask, request, jsonify
from supabase import create_client, Client

db_url = os.environ.get("SUPABASE_URL")
db_key = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(db_url, db_key)

app = Flask(__name__)

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_email(email: str) -> bool:
    regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(regex, email) is not None
 

@app.route("/auth/register", methods=['POST'])
def register():
    if request.method == "POST":
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
        existing_user = supabase.table("users").select("*").eq("email", email).execute()
        if existing_user.data:
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
