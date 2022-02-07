from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User 
from werkzeug.security import generate_password_hash, check_password_hash 
from . import db 
from flask_login import login_user, login_required, logout_user, current_user 

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login(): 
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first() 
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in succesfully', category='error')
                login_user(user)
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else: 
            flash('Email does not exist.', category='error')
    return render_template("login.html", user=current_user)


@auth.route('/', methods=['POST', 'GET'])
def index():
    return render_template("login.html", user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user() 
    return redirect(url_for('auth.login'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up(): 
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password_1 = request.form.get('password1')
        password_2 = request.form.get('password2')


        # define requirements and check imput
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')
        elif "@" not in email: 
            flash('Not a valid email.', category='error')
        elif password_1 != password_2:
            flash('Passwords are don\'t match.', category='error')
        elif len(password_1) < 10: 
            flash('Password must be atleast 10 characters')
        else: 
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                password_1, method='sha256'
            ))
            db.session.add(new_user)
            db.session.commit() 
            login_user(new_user)
            flash('Account created', category='success')
            return redirect(url_for('views.home'))


    return render_template("sign_up.html", user=current_user)

