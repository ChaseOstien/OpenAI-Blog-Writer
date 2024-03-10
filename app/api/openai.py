from flask_restful import Resource, Api, reqparse
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, current_user
from extensions import jwt
from openai import OpenAI
from dotenv import load_dotenv
from app.db import get_db
from app.models import Blog, User

generate_blog = Blueprint('api', __name__)
api = Api(generate_blog)

load_dotenv()
client = OpenAI()

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    db = get_db()
    identity = jwt_data["sub"]
    user = db.query(User).filter_by(id=identity).one_or_none()
    print(user)
    return user

class Generate_blog(Resource):
    @jwt_required(optional=True)
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('clientPrompt')
        args = parser.parse_args()
        client_prompt = args.clientPrompt

        prompt = [
            {"role": "system", "content": "You are a blog writer, skilled in writing clear, engaging and helpful blog posts that can be used for landing pages and add campaigns. You always return content with lines seperated by double line breaks."},
            {"role": "user", "content": client_prompt}
        ]
        
        response = client.chat.completions.create(
            model='gpt-3.5-turbo-1106',
            messages=prompt,
            max_tokens=750,
            temperature=0.5
        )

        blog_post = response.choices[0].message.content

        title = blog_post.split('\n\n')[0]
        content = '\n\n'.join(blog_post.split('\n\n')[1:])

        blog_data = {
            'title': title,
            'content': content
        }

        new_blog = Blog(
            title = blog_data['title'],
            content = blog_data['content'],
            user_id = current_user.id
        )

        print(new_blog)

        with get_db() as db:
            try:
                db.add(new_blog)
            except:
                db.rollback()
                return jsonify(message = 'Blog failed to save!'), 500
            else:
                db.commit()
    
        return jsonify(blog_data)

api.add_resource(Generate_blog, '/generate')
