import os
import bcrypt

from flask import Flask, request, jsonify
from supabase import create_client, Client

db_url = os.environ.get("SUPABASE_URL")
db_key = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(db_url, db_key)

app = Flask(__name__)

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
 

@app.route("/auth/register", methods=['POST'])
def register():
    if request.method == "POST":
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')
        
        if not username or not email or not password:
            return jsonify({"error": "Username, email, and password are required"}), 400
        
        hashed_password = hash_password(password)
                
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
