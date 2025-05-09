from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

orders_bp = Blueprint("orders", __name__, url_prefix="/orders")

def get_order_with_id(supabase, order_id):
    response = supabase.table("orders").select("*").eq("id", order_id).execute()
    return response.data[0] if response.data else None
 
@orders_bp.route("/<int:id>", methods=['GET'])
@jwt_required()
def get_order(id):
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Check if the user exists
    order = get_order_with_id(supabase, id)
    if not order:
        return jsonify({"error": f"Order with id={id} not found."}), 404
    
    # Validate user resource authorization
    if get_jwt_identity() not in [str(order["buyer_id"]), str(order["seller_id"])]:
        return jsonify({"error": "You can only view your own orders."}), 403
    
    return jsonify(order), 200

@orders_bp.route("/purchases", methods=['GET'])
@jwt_required()
def get_purchases():
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Retrieve purchase history
    buyer_id = int(get_jwt_identity())
    response = supabase.table("orders").select("*").eq("buyer_id", buyer_id).execute()

    return jsonify(response.data), 200

@orders_bp.route("/sales", methods=['GET'])
@jwt_required()
def get_sales():
    # Get the Supabase client
    supabase = current_app.supabase
    
    # Retrieve sales history
    seller_id = int(get_jwt_identity())
    response = supabase.table("orders").select("*").eq("seller_id", seller_id).execute()

    return jsonify(response.data), 200

@orders_bp.route("/", methods=['POST'])
@jwt_required()
def record_order():
    # Get the Supabase client
    supabase = current_app.supabase

    # Get the data from the request    
    buyer_id = int(get_jwt_identity())
    artwork_id = request.json.get('artwork_id')
    
    # Input validation
    if not buyer_id:
        return jsonify({"error": "Artwork buyer required."}), 400
    if not artwork_id:
        return jsonify({"error": "Artwork id required."}), 400
    
    # Fetch artwork seller and download url
    response = supabase.table("artworks").select("seller_id, download_url").eq("id", artwork_id).execute()
    artwork = response.data[0] if response.data else None
    if not artwork:
        return jsonify({"error": "Invalid artwork ID."}), 404
    
    seller_id = artwork["seller_id"]
    download_url = artwork["download_url"]
    
    try:
        response = (
            supabase.table("orders")
            .insert({
                "artwork_id": artwork_id,
                "buyer_id": buyer_id,
                "seller_id": seller_id,
                "download_url": download_url
            })
            .execute()
        )
        return jsonify(response.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    