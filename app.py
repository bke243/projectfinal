import os

from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash


# these import are not from here
import requests
import urllib.parse
from functools import wraps

# end of import


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

# this content should be in helpers.py
def apology(message, code=400):
    """Render message as an apology to user."""

    return render_template("apology.html", top=code, bottom=message)

##################################

@app.route("/", methods=["GET"])
def home():
    """Redirect to the home page"""
    return redirect("/index")

@app.route("/index", methods=["GET"])
def index():
    """Render the main page"""
    if request.method == "GET":
        # display homepage if the user is not log in
        return redirect("/index.html")
    else:
        return apology("SORRY")


@app.route("/homepage", methods=["GET"])
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
def series():
    """Display the series UI and perform calculation on resistors connected in series"""

    # Display the UI page
    if request.method == "GET":
        return render_template("series.html")
    # perform others operations to determine
    else:
        return apology("TO DO PETER")

@app.route("/parallel", methods=["GET", "POST"])
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