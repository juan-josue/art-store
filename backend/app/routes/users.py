from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

users_bp = Blueprint("users", __name__, url_prefix="/users")

def get_user_with_id(supabase, user_id):
    response = supabase.table("users").select("*").eq("id", user_id).execute()
    return response.data[0] if response.data else None
 
@users_bp.route("/<int:id>", methods=['GET', 'DELETE'])
@jwt_required()
def handle_user(id):
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Check if the user exists
    user = get_user_with_id(supabase, id)
    if not user:
        return jsonify({"error": f"User with id={id} not found."}), 404
    
    if request.method == 'GET':    
        return jsonify(user), 200
    
    elif request.method == 'DELETE':
        if str(id) != get_jwt_identity():
            return jsonify({"error": "You can only delete your own account."}), 403
        try:
            supabase.table("users").delete().eq("id", id).execute()
            return jsonify({"message": "User deleted successfully."}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    