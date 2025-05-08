from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

artworks_bp = Blueprint("artworks", __name__, url_prefix="/artworks")

def get_artwork_with_id(supabase, artwork_id):
    response = supabase.table("artworks").select("*").eq("id", artwork_id).execute()
    return response.data[0] if response.data else None
 
@artworks_bp.route("/", methods=['GET'])
def get_all_artworks():
    # Get the Supabase client
    supabase = current_app.supabase
    
    query = supabase.table("artworks").select("*")

    # Get tags from the request
    tags = request.args.get('tags').split(",") if request.args.get('tags') else None
    if tags:
        query = query.contains("tags", tags)
        
    response = query.execute()
    
    # Check if there are any artworks
    if not response.data:
        return jsonify({"error": "No artworks found."}), 404
    
    return jsonify(response.data), 200
 
@artworks_bp.route("/<int:id>", methods=['GET'])
def get_single_artwork(id):
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Check if the user exists
    artwork = get_artwork_with_id(supabase, id)
    if not artwork:
        return jsonify({"error": f"User with id={id} not found."}), 404
        
    return jsonify(artwork), 200
    
@artworks_bp.route("/", methods=['POST'])
@jwt_required()
def create_artwork():
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Get the current user's ID
    seller_id = get_jwt_identity()
    
    # Get the data from the request
    title = request.json.get('title')
    description = request.json.get('description')
    price = request.json.get('price')
    preview_url = request.json.get('preview_url')
    download_url = request.json.get('download_url')
    tags = request.json.get('tags')
    
    # Input validation
    if not title:
        return jsonify({"error": "Artwork title required."}), 400
    if not price:
        return jsonify({"error": "Artwork price required."}), 400
    if not preview_url or not download_url:
        return jsonify({"error": "Artwork preview and download URLs required."}), 400
    
    try:
        response = (
            supabase.table("artworks")
            .insert({
                "title": title,
                "description": description,
                "price": price,
                "preview_url": preview_url,
                "download_url": download_url,
                "tags": tags,
                "seller_id": seller_id
            })
            .execute()
        )
        return jsonify(response.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@artworks_bp.route("/<int:id>", methods=['DELETE'])
@jwt_required()
def delete_artwork(id):
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Check if the artwork exists
    artwork = get_artwork_with_id(supabase, id)
    if not artwork:
        return jsonify({"error": f"Artwork with id={id} not found."}), 404
    
    # Check if the user is the seller of the artwork
    if str(artwork['seller_id']) != get_jwt_identity():
        return jsonify({"error": "You can only delete your own artworks."}), 403
    
    try:
        supabase.table("artworks").delete().eq("id", id).execute()
        return jsonify({"message": "Artwork deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500