from flask_restful import Resource, Api
from flask import Blueprint, jsonify
from openai import OpenAI
import openai
from dotenv import load_dotenv

generate_blog = Blueprint('api', __name__)
api = Api(generate_blog)

load_dotenv()
client = OpenAI()

class Generate_blog(Resource):
    def get(self):

        prompt = [
            {"role": "system", "content": "You are a blog writer, skilled in writing clear, engaging and helpful blog posts that can be used for landing pages and add campaigns."},
            {"role": "user", "content": "Write an article about the importance of building a good credit score."}
]

        response = client.chat.completions.create(
            model='gpt-3.5-turbo-1106',
            messages=prompt,
            max_tokens=750,
            temperature=0.5
        )

        blog_post = response.choices[0].message
        print(blog_post)

        blogs_data = []
        for blog in blog_post:
            blog_data = {
                'blog_text': blog
            }

            blogs_data.append(blog_data)
    
        return jsonify(blogs_data)

api.add_resource(Generate_blog, '/generate')
