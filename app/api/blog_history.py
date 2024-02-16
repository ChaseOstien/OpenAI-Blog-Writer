from flask_restful import Resource, Api
from flask import Blueprint, jsonify
from app.db import get_db
from app.models import Blog

query_blogs = Blueprint('history', __name__)
api = Api(query_blogs)

class Query_blogs(Resource):
    def get(self):

        with get_db() as db:
            try:
                blog_history = db.query(Blog).order_by(Blog.created_at.asc()).all()
            except:
                db.rollback()
                return jsonify(message = 'Blog history failed to load!'), 500
            else:
                title = blog_history.title
                content = blog_history.content
                generated = blog_history.created_at

                blog = {
                    'title': title,
                    'content': content,
                    'generated': generated
                }

                return jsonify(blog)

api.add_resource(Query_blogs, '/history')
