import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash


# these import are not from here
import sqlalchemy

import requests
import urllib.parse
import re
from functools import wraps

# end of import

# start
# added the below as part of Heroku post on Medium
import psycopg2
urllib.parse.uses_netloc.append("postgres")
url = urllib.parse.urlparse(os.environ["DATABASE_URL"])
conn = psycopg2.connect('postgres://wcvavlpiuqaivg:0736eeb5cb2f842b4651844ac50ada8c7e7352fb95e180fdb3df2d1d13dec2c8@ec2-54-217-219-235.eu-west-1.compute.amazonaws.com:5432/d2spdkkmuliugh', sslmode='require')
# end

# Configure application
app = Flask(__name__)


# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("postgres://wcvavlpiuqaivg:0736eeb5cb2f842b4651844ac50ada8c7e7352fb95e180fdb3df2d1d13dec2c8@ec2-54-217-219-235.eu-west-1.compute.amazonaws.com:5432/d2spdkkmuliugh")

# start
# added the below as part of Heroku post on Medium
class SQL(object):
    def __init__(self, url):
        try:
            self.engine = sqlalchemy.create_engine(url)
        except Exception as e:
            raise RuntimeError(e)
    def execute(self, text, *multiparams, **params):
        try:
            statement = sqlalchemy.text(text).bindparams(*multiparams, **params)
            result = self.engine.execute(str(statement.compile(compile_kwargs={"literal_binds": True})))
            # SELECT
            if result.returns_rows:
                rows = result.fetchall()
                return [dict(row) for row in rows]
            # INSERT
            elif result.lastrowid is not None:
                return result.lastrowid
            # DELETE, UPDATE
            else:
                return result.rowcount
        except sqlalchemy.exc.IntegrityError:
            return None
        except Exception as e:
            raise RuntimeError(e)
# end

# this content should be in helpers.py

def apology(message, code=400):
    """Render message as an apology to user."""

    return render_template("apology.html", top=code, bottom=message)


def get_value(name):
    """ Get the value of an input field"""

    value = request.form.get(name)
    return value

def available(usermail, username):
    """Check if a user identification was taken """

    rows_1 = db.execute("SELECT username FROM users")
    rows_2 = db.execute("SELECT email FROM users")

    # ensure that tjhe username and email was not taken
    if {"email": usermail} in rows_2:
        return "Email already taken"
    elif {"username": username} in rows_1:
        return "Username already taken"
    else:
        return True

def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

def password_check(password):
    """
    Verify the strength of 'password'
    Returns a dict indicating the wrong criteria
    A password is considered strong if:
        8 characters length or more but less than 12
        1 digit or more
        1 symbol or more
        1 uppercase letter or more
        1 lowercase letter or more
    """

    # calculating the length
    length_error = (len(password) < 7 and len(password) > 18)

    # searching for digits
    digit_error = re.search(r"\d", password) is None

    # searching for uppercase
    uppercase_error = re.search(r"[A-Z]", password) is None

    # searching for lowercase
    lowercase_error = re.search(r"[a-z]", password) is None

    # searching for symbols
    symbol_error = not (re.search(r"\W", password) is None)

    # overall result
    password_ok = not ( length_error or digit_error or uppercase_error or lowercase_error or symbol_error )

    return password_ok



@app.route("/", methods=["GET"])
def home():
    """Redirect to the home page"""
    return redirect("/index")

@app.route("/index", methods=["GET"])
def index():
    """Render the main page"""

    if request.method == "GET":

        # display homepage if the user is not log in
        if not session.get("user_id"):
            return render_template("index.html")
        # display the index page
        else:
            return redirect("/homepage")

    else:
        return apology("SORRY")


@app.route("/login", methods=["GET", "POst"])
def login():
    """ Ensure user login"""
    # Forget any user_id
    session.clear()

    # User reached route via POST
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("You must provide  your Username")

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("You must provide your Password")

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("Invalid sername and/or password")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/homepage")

    # User reached route via GET
    else:
        return render_template("login.html")

@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/login")

@app.route("/register", methods=["GET", "POST"])
def register():
    """ Ensure user registration"""
    # Forget any user_id
    session.clear()

    if request.method == "POST":
        # ensure email was provided
        if not request.form.get("email"):
            return apology("You must provide your email")

        # ensure that . and @ are in the email
        if not "." in request.form.get("email") or not "@" in request.form.get("email"):
            return apology("you must provide a valid email")

        # ensure usernme was provided
        elif not request.form.get("username"):
            return apology("You must provide the Username")

        # ensure password and confirmation password was provided
        elif not request.form.get("password") or not request.form.get("confirmation"):
            return apology("You must provide the Password")

        # ensure password and password again match
        elif request.form.get("password") != request.form.get("confirmation"):
            return apology("Your password must be the same")

        #ensure that the password respect all requirement
        elif password_check(request.form.get("password")) == False:
            return apology("Your password must contain 8-12 characters and at least one digit, upper and lowercase english letters", 403)

        usermail = get_value("email")
        username = get_value("username")
        hash_password = generate_password_hash(get_value("password"))

        data_availability = available(usermail, username)
        # ensure that the username or eamail is available
        if data_availability == True:
            # add the user in the data base
            db.execute("INSERT INTO users(username, email, hash) VALUES(:username, :email, :hash_password)",
                       username=username, email=usermail, hash_password=hash_password)

            # store the user's id into session for a better user experience
            user = db.execute("SELECT id  FROM users WHERE username = :username", username=username)
            if not user:
                return apology("Username already taken can not insert the username")

            session["user_id"] = user[0]["id"]

            # flash a message to the user and render the user's home page
            flash("You are registered")
            return redirect("/homepage")
        else:
            return apology(data_availability)

    else:
        return render_template("register.html")


@app.route("/homepage", methods=["GET"])
@login_required
def hompage():
    """Display to registered users their home page"""
    return render_template("homepage.html")


@app.route("/resistor", methods=["GET", "POST"])
def resistor():
    """Display the resistor UI and compute the resistor's value"""

    # Display the UI page
    if request.method == "GET":
        return render_template("resistor.html")

    # execute other operation to determine
    else:
        return apology("TO DO PETER")

@app.route("/series", methods=["GET", "POST"])
@login_required
def series():
    """Display the series UI and perform calculation on resistors connected in series"""

    # Display the UI page
    if request.method == "GET":
        return render_template("series.html")
    # perform others operations to determine
    else:
        return apology("TO DO PETER")

@app.route("/parallel", methods=["GET", "POST"])
@login_required
def parallel():
    """Display the parallel UI and perform calculation on resistors connected in parallel"""

    # Display the UI page
    if request.method == "GET":
        return render_template("parallel.html")
    # execute others operations to determine
    else:
        return apology("TO DO PETER")

def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)



# start
# added the below as part of Heroku post on Medium
if __name__ == '__main__':
     app.debug = True
     port = int(os.environ.get("PORT", 5000))
     app.run(host='0.0.0.0', port=port)
# end