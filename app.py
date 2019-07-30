# import necessary libraries
#import sqlite3
import json
#import numpy as np
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func
# from flask import (
#     Flask,
#     render_template,
#     url_for,
#     jsonify,
#     request,
#     redirect)
from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
from flask import * 
import os
import module23
import training_models
from flask import Flask,abort,render_template,request,redirect,url_for
from werkzeug import secure_filename
from flask import Flask, session

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)
# secret key is needed for session
app.secret_key = 'dljsaklqk24e21cjn!Ew@@dsa5'
#################################################
# Flask Routes
#################################################

UPLOAD_FOLDER = './static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 

# create route that renders index.html template
@app.route("/")
def upload():  
    return render_template("index.html")  
 
@app.route('/success', methods = ['POST'])  
def success(): 
    
    if request.method == 'POST':  
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
            #train = training_models.trainer(filename)
            session["filename"] = filename
        return render_template('success.html', filename=filename) #train=train   


@app.route("/results", methods = ['POST'])
def results():
    fileNamefromSuccess =session.get("filename",None)
    train = training_models.trainer(fileNamefromSuccess)
    return render_template("results.html",fileNamefromSuccess=fileNamefromSuccess, train=train)


# create route that renders about.html template
@app.route("/about")
def About():
    return render_template("about.html")



if __name__ == "__main__":
    app.debug = True
    app.run()
