import pytest
from app.models import Document, db

def test_list_documents_empty(client):
    """Test listing documents when no documents exist."""
    response = client.get("/api/documents/")
    assert response.status_code == 200
    assert response.get_json() == []

def test_create_document(client):
    """Test creating a new document."""
    payload = {"name": "Test Doc", "content": "This is a test."}
    response = client.post("/api/documents/", json=payload)
    data = response.get_json()

    assert response.status_code == 201
    assert data["name"] == payload["name"]
    assert data["content"] == payload["content"]
    assert data["size"] == len(payload["content"])

def test_create_document_validation(client):
    """Test creating a document with invalid data."""
    payload = {"name": "", "content": ""}
    response = client.post("/api/documents/", json=payload)
    assert response.status_code == 400
    assert "name" in response.get_json()
    assert "content" in response.get_json()

def test_get_document(client):
    """Test retrieving a single document."""
    document = Document(name="Test Doc", content="Test content", size=12)
    db.session.add(document)
    db.session.commit()

    response = client.get(f"/api/documents/{document.id}")
    data = response.get_json()

    assert response.status_code == 200
    assert data["id"] == document.id
    assert data["name"] == document.name
    assert data["content"] == document.content

def test_get_document_not_found(client):
    """Test retrieving a document that does not exist."""
    response = client.get("/api/documents/9999")
    assert response.status_code == 404
    assert response.get_json() == {"error": "Document not found"}

def test_delete_document(client):
    """Test deleting a document."""
    document = Document(name="Test Doc", content="Test content", size=12)
    db.session.add(document)
    db.session.commit()

    response = client.delete(f"/api/documents/{document.id}")
    assert response.status_code == 200
    assert response.get_json() == {"message": "Document deleted"}

    assert Document.query.get(document.id) is None

def test_delete_document_not_found(client):
    """Test deleting a document that does not exist."""
    response = client.delete("/api/documents/9999")
    assert response.status_code == 404
    assert response.get_json() == {"error": "Document not found"}

def test_search_documents(client):
    """Test searching for documents by name."""
    doc1 = Document(name="Alpha", content="First document", size=14)
    doc2 = Document(name="Beta", content="Second document", size=15)
    db.session.add_all([doc1, doc2])
    db.session.commit()

    response = client.get("/api/documents/?search=Alpha")
    data = response.get_json()

    assert response.status_code == 200
    assert len(data) == 1
    assert data[0]["name"] == "Alpha"
