from flask_restful import Resource, Api
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, current_user
from extensions import jwt

from app.db import get_db
from app.models import Blog, User

query_blogs = Blueprint('history', __name__)
api = Api(query_blogs)

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

class Query_blogs(Resource):
    @jwt_required(optional=True)
    def get(self):
        with get_db() as db:
            try:
                # all_blogs = db.query(Blog).order_by(Blog.created_at.desc()).all()
                # print(all_blogs)
                if current_user.id:
                    all_blogs = db.query(Blog).filter(Blog.user_id == current_user.id).order_by(Blog.created_at.desc()).all()
                else:
                    all_blogs = db.query(Blog).order_by(Blog.created_at.desc()).all()
                    print(all_blogs)
            except:
                db.rollback()
                return jsonify(message = 'Blog history failed to load!'), 500
            else:
                blog_data = []
                for blog in all_blogs:
                    blog_history = {
                        'id': blog.id,
                        'title': blog.title,
                        'content': blog.content,
                        'generated': blog.created_at
                    }
                    blog_data.append(blog_history)

                return jsonify(blog_data)
    
    @jwt_required(optional=True)
    def put(self, id):
        with get_db() as db:
            try:
                one_blog = db.query(Blog).filter(Blog.id == id).one()
            except:
                db.rollback()
                return jsonify(message = 'Blog failed to load!'), 500
            else:
                blog = {
                    'id': one_blog.id,
                    'title': one_blog.title,
                    'content': one_blog.content,
                    'generated': one_blog.created_at
                }
            return jsonify(blog)

api.add_resource(Query_blogs, '/history')
api.add_resource(Query_blogs, '/history/<int:id>', endpoint='get_by_id')
