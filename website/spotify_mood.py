from sqlite3 import Cursor
from unicodedata import category
from flask import Blueprint, render_template, request, flash, jsonify 
from flask_login import  login_required, current_user
from . import db
import json 
import spotipy 
from .models import User 


spotify_mood = Blueprint('mood', __name__)

@spotify_mood.route('/mood', methods=['GET', 'POST'])
@login_required
def mood():
    if request.method == 'POST': 
        mood = request.form.get('mood')
        print(User.last_mood)
        '''
        if User.query.filter_by(last_mood=str(last_mood)) is not None:
            # display history
            last_mood = User.query.filter_by(last_mood)
            print(last_mood)  
        '''

        if len(mood) < 1: #TODO add regex 
            flash('Mood needs to be one word only', category='error')
        else:
            ## Make calls to spotify and generate playlist here. 

            #Store passed in mood in database
            mood = request.form.get('mood')
            flash(f"Mood entered: {mood}", category='success')

            pass     
                
            flash('Generating playlist', category='success')
    return render_template("mood.html", user=current_user)
