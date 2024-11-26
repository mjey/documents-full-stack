from app.models import Document, db

def list_documents(search=None, sort_by="id", order="asc", page=1, limit=10):
    query = Document.query

    if search:
        query = query.filter(Document.name.like(f"%{search}%"))

    sort_column = getattr(Document, sort_by, None)
    if not sort_column:
        sort_column = Document.id  # Default to sorting by ID
    query = query.order_by(sort_column.asc() if order == "asc" else sort_column.desc())

    total_documents = query.count()
    total_pages = (total_documents + limit - 1) // limit
    documents = query.offset((page - 1) * limit).limit(limit).all()

    results = [
        {
            "id": doc.id,
            "name": doc.name,
            "content": doc.content,
            "created_at": doc.created_at,
            "size": doc.size,
        }
        for doc in documents
    ]

    meta = {
        "total_documents": total_documents,
        "current_page": page,
        "limit": limit,
        "total_pages": total_pages,
        "sort_by": sort_by,
        "order": order,
    }

    return {"meta": meta, "documents": results}



def get_document(doc_id):
    document = Document.query.get(doc_id)
    if document:
        return {
            "id": document.id,
            "name": document.name,
            "content": document.content,
            "created_at": document.created_at,
            "size": document.size
        }
    return None

def create_document(data):
    new_document = Document(
        name=data["name"],
        content=data["content"],
        size=len(data["content"])
    )
    db.session.add(new_document)
    db.session.commit()
    return {
        "id": new_document.id,
        "name": new_document.name,
        "content": new_document.content,
        "created_at": new_document.created_at,
        "size": new_document.size
    }
def update_document(doc_id, data):
    document = Document.query.get(doc_id)
    if not document:
        return None

    if "name" in data:
        document.name = data["name"]
    if "content" in data:
        document.content = data["content"]
        document.size = len(data["content"]) 

    db.session.commit()
    return {
        "id": document.id,
        "name": document.name,
        "content": document.content,
        "created_at": document.created_at,
        "size": document.size
    }

def delete_document(doc_id):
    document = Document.query.get(doc_id)
    if not document:
        return False
    db.session.delete(document)
    db.session.commit()
    return True
