import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///documents.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
    CORS_ALLOWED_ORIGINS = ["*"]
