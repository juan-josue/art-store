import os
from flask import Flask
from supabase import create_client

from app.routes.auth import auth_bp
from app.routes.users import users_bp

app = Flask(__name__)

# Add database configuration
db_url = os.environ.get("SUPABASE_URL")
db_key = os.environ.get("SUPABASE_KEY")
app.supabase = create_client(db_url, db_key)

# Register Routes
app.register_blueprint(auth_bp)
app.register_blueprint(users_bp)