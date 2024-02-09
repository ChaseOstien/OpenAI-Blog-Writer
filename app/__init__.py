from openai import OpenAI
from flask import Flask
from flask_restful import Resource, Api
from dotenv import load_dotenv
import openai
from app.api import generate_blog
from flask_cors import CORS
from app.db import init_db

load_dotenv()
client = OpenAI()

def create_app(test_config=None):
    app = Flask(__name__, static_url_path='/')
    app.url_map.strict_slashes = False

    api = Api(app)

    app.register_blueprint(generate_blog)

    CORS(app)

    init_db(app)

    return app
