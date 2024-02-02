from openai import OpenAI
from flask import Flask
from flask_restful import Resource, Api
from dotenv import load_dotenv
import openai
from app.api import generate_blog

load_dotenv()
client = OpenAI()

def create_app(test_config=None):
    app = Flask(__name__, static_url_path='/')
    app.url_map.strict_slashes = False

    api = Api(app)

    app.register_blueprint(generate_blog)

    return app

# completion = client.chat.completions.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
#     {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
#   ]
# )

# print(completion.choices[0].message)

# prompt = [
#     {"role": "system", "content": "You are a blog writer, skilled in writing clear, engaging and helpful blog posts that can be used for landing pages and add campaigns."},
#     {"role": "user", "content": "Write an article about the importance of building a good credit score."}
# ]

# response = client.chat.completions.create(
#     model='gpt-3.5-turbo-1106',
#     messages=prompt,
#     max_tokens=750,
#     temperature=0.5
# )

# print(response.choices[0].message)
