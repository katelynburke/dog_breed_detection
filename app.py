# import necessary libraries
import sqlite3
import json
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import (
    Flask,
    render_template,
    url_for,
    jsonify,
    request,
    redirect)
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask import * 
import os

from flask import Flask,abort,render_template,request,redirect,url_for
from werkzeug import secure_filename
#################################################
## Database Connection using SQLAlchemy
#################################################
##http://flask.pocoo.org/docs/1.0/tutorial/database/

## create a connection with the database
#engine = create_engine("sqlite:///static/db/weatherData.sqlite", connect_args={'check_same_thread': False})
## reflect an existing database into a new model
#Base = automap_base()
## reflect the tables
#Base.prepare(engine, reflect=True)
# reflect all of the classes mapped to the Base
#Base.classes.keys()
# create a "Metadata" Layer That Abstracts our SQL Database
#Base.metadata.create_all(engine)
# Save a reference to the each database table like this:  ConsumptionSector = Base.classes.energy_consumption_sector
## ADD CODE HERE!!

# Create our session (link) from Python to the DB
#session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = './static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 
#################################################
# Flask Routes
#################################################

# create route that renders index.html template
@app.route("/")
# def home():
#     return render_template("index.html")
def upload():  
    return render_template("index.html")  
 
@app.route('/success', methods = ['POST'])  
def success():  
    if request.method == 'POST':  
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        return render_template('success.html')    
# create route that renders about.html template
@app.route("/about")
def About():
    return render_template("about.html")



if __name__ == "__main__":
    app.debug = True
    app.run()
