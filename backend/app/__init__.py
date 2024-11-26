from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object("app.config.Config")
    db.init_app(app)

    with app.app_context():
        from app.routes import documents
        app.register_blueprint(documents.bp)

        db.create_all()

    @app.before_request
    def log_request_info():
        print(f"Incoming request: {request.method} {request.url}")
        print(f"Headers: {request.headers}")
        print(f"Body: {request.get_data()}")

    return app
