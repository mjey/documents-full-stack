from flask import Blueprint, jsonify, request
from app.services.document_service import (
    list_documents, 
    get_document, 
    create_document, 
    delete_document,
    update_document
)
from app.validations.document_validator import validate_document_input

bp = Blueprint("documents", __name__, url_prefix="/api/documents")

@bp.route("", methods=["GET", "OPTIONS"])
def list_or_search_documents():
    search_query = request.args.get("search", None)
    sort_by = request.args.get("sort_by", "id")
    order = request.args.get("order", "asc")
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    data = list_documents(search=search_query, sort_by=sort_by, order=order, page=page, limit=limit)

    return jsonify(data), 200

@bp.route("/<int:doc_id>", methods=["GET", "OPTIONS"])
def fetch_document(doc_id):
    document = get_document(doc_id)
    if not document:
        return jsonify({"error": "Document not found"}), 404
    return jsonify(document), 200

@bp.route("", methods=["POST", "OPTIONS"])
def add_document():
    data = request.get_json()
    errors = validate_document_input(data)
    if errors:
        return jsonify(errors), 400

    new_document = create_document(data)
    return jsonify(new_document), 201

@bp.route("/<int:doc_id>", methods=["PUT", "OPTIONS"])
def update_document_route(doc_id):
    data = request.get_json()

    # Basic input validation
    if not data or not isinstance(data, dict):
        return jsonify({"error": "Invalid input data"}), 400

    updated_document = update_document(doc_id, data)
    if not updated_document:
        return jsonify({"error": "Document not found"}), 404

    return jsonify(updated_document), 200


@bp.route("/<int:doc_id>", methods=["DELETE", "OPTIONS"])
def remove_document(doc_id):
    if not delete_document(doc_id):
        return jsonify({"error": "Document not found"}), 404
    return jsonify({"message": "Document deleted"}), 200
