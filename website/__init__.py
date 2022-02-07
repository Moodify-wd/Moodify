from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from os import path 
from flask_login import LoginManager
import secrets 
import os


db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    random_secret =  secrets.token_urlsafe()  # Generates a random secret this only generated on init
    # print(random_secret)
    app = Flask(__name__)
    app.config['SECRET_KEY'] = random_secret
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    from .spotify_mood import spotify_mood 
    from .auth import auth 

    app.register_blueprint(spotify_mood, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User 

    create_database(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    return app 

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
        print("Created Database")


    