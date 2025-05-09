import os
from flask import Flask
from flask_jwt_extended import JWTManager
from supabase import create_client

from app.routes.auth import auth_bp
from app.routes.users import users_bp
from app.routes.artworks import artworks_bp
from app.routes.orders import orders_bp

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
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