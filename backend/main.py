from app import create_app
from flask_cors import CORS, cross_origin

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
