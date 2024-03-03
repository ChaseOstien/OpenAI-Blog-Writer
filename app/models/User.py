from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(1000), nullable=False)

    def set_password(self, password):
        return generate_password_hash(password, salt_length=16, method='pbkdf2:sha256:600000')

    # def set_password(self, password):
    #     if isinstance(password, str):
    #         return generate_password_hash(password, 16)
    #     else:
    #         try:
    #             return generate_password_hash(str(password), 16)
    #         except Exception as e:
    #             print(f"Error generating password hash: {e}")
    #             return None

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided!')
        
        if len(username) < 5 or len(username) > 25:
            raise AssertionError('Username must be between 5 and 25 characters!')
        
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError('No email provided!')
        
        if '@' not in email:
            raise AssertionError('Invalid email format!')
        
        return email
