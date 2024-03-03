from flask_restful import Resource, Api, reqparse
from flask import Blueprint, jsonify, request

from app.db import get_db
from app.models import User

from flask_jwt_extended import create_access_token, get_jwt_identity, set_access_cookies, unset_jwt_cookies
import sys
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash

auth = Blueprint('auth', __name__, url_prefix='/auth')
api = Api(auth)

class Login(Resource):
    def post(self):
        
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args(strict=True)
        username = args.username
        password = args.password
        print(username)
        print(password)

        with get_db() as db:
            try:
                user = db.query(User).filter(User.username == username).one()
                print(user)
            except:
                db.rollback()
                return jsonify(message = 'No user found with that information!')
            else:
                if user.check_password(password) == False:
                    return jsonify(message = 'Incorrect information!')
                
                response = jsonify({'msg': 'Login successful!'})
                access_token = create_access_token(identity=username)
                set_access_cookies(response, access_token)
                return response

class Signup(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('username')
            parser.add_argument('password')
            parser.add_argument('email')
            args = parser.parse_args(strict=True)
            print(args)
            username = args.username
            password = str(args.password)
            email = args.email
            print(username, password, email)
            print(type(password))

            db = get_db()

            print('Hello')
            try:
                newUser = User(
                    username = username, 
                    email = email,
                    password = password
                )
                print(newUser)

                newUser.set_password(password)

                db.add(newUser)
                db.commit()
            except SQLAlchemyError as e:
                print(f"Error adding user to database: {e}")
                db.rollback()
                return jsonify(message = 'Failed to add new user!')
        
            response = jsonify({ 'msg': 'Sign up successful!' })
            access_token = create_access_token(identity=username)
            set_access_cookies(response, access_token)
            return response
        except Exception as e:
            print(f"Error: {e}")
            return jsonify(message = 'An unexpected error occured!')

class Logout(Resource):
    def post(self):

        response = jsonify({ 'msg': 'logout successful!' })
        unset_jwt_cookies(response)
        return response

api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(Logout, '/logout')
