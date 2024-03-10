from openai import OpenAI
from flask import Flask
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import openai
from app.api import generate_blog, query_blogs, auth
from flask_cors import CORS
from app.db import init_db
from extensions import jwt

load_dotenv()
client = OpenAI()

def create_app(test_config=None):
    app = Flask(__name__, static_url_path='/')
    app.url_map.strict_slashes = False
    app.config['JWT_SECRET_KEY'] = 'JWT_SECRET_KEY'
    app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
    app.config['JWT_COOKIE_SECURE'] = False
    jwt.init_app(app)
    bcrypt = Bcrypt(app)

    api = Api(app)

    app.register_blueprint(generate_blog)
    app.register_blueprint(query_blogs)
    app.register_blueprint(auth)

    CORS(app)

    init_db(app)

    return app
