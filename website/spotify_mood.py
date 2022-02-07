from flask import Blueprint, render_template, request, flash, jsonify 
from flask_login import  login_required, current_user
from . import db
import json 
import spotipy 


spotify_mood = Blueprint('spotify_mood', __name__)

@spotify_mood.route('/mood', methods=['GET', 'POST'])
def mood():
    if request.method == 'POST': 
        mood = request.form.get('mood')

        if len(mood) < 1: #TODO add regex 
            flash('Mood needs to be one word only', category='error')
        else:
            ## Make calls to spotify and generate playlist here. 
            flash('Generating playlist', category='success')
    return render_template("mood.html", user=current_user)


