import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from supabase import create_client

from app.routes.auth import auth_bp
from app.routes.users import users_bp
from app.routes.artworks import artworks_bp
from app.routes.orders import orders_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token"
app.config["JWT_COOKIE_SECURE"] = False  # True only in production w/ HTTPS
app.config["JWT_COOKIE_SAMESITE"] = "Lax"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False  # disable for dev
jwt = JWTManager(app)

# Add database configuration
db_url = os.environ.get("SUPABASE_URL")
db_key = os.environ.get("SUPABASE_KEY")
app.supabase = create_client(db_url, db_key)

# Register Routes
app.register_blueprint(auth_bp)
app.register_blueprint(users_bp)
app.register_blueprint(artworks_bp)
app.register_blueprint(orders_bp)