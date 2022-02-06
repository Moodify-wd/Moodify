from flask import Blueprint, render_template, request, flash, jsonify 
from flask_login import  login_required, current_user
from . import db
import json 
import spotipy 


views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST': 
        mood = request.form.get('mood')

        if len(mood) < 1:
            flash('Mood needs to be one word only', category='error')
        else:
            ## Make calls to spotify and generate playlist here. 


            flash('Generating playlist', category='success')
    return render_template("home.html", user=current_user)






