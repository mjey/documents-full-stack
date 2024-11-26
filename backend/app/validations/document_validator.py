def validate_document_input(data):
    errors = {}
    if not data.get("name"):
        errors["name"] = "Name is required."
    if not data.get("content"):
        errors["content"] = "Content is required."
    return errors
