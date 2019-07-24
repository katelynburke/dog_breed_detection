##########################
## Import Libraries and Dependencies
##########################
import sqlite3, csv
import sqlite3
import pandas as pd
from numpy import genfromtxt
from time import time
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Date, VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import *
from datetime import datetime, timedelta
from random import randint
import os
import csv
import datetime
import sys
import numpy as np
from io import StringIO
###################################
## How to use this file
###################################
## Run this file once to create the database from 
## the CSVs in the data file
## Open this file in the terminal and run: python createDB.py




##################################
## SQLAlchemy Declarative base
# ################################
# The declarative base is a function that returns 
# a new base class from which all mapped classes 
# should inherit.

#Create the database
engine = create_engine('sqlite:///weatherData.sqlite')
Base = declarative_base()

#https://www.freecodecamp.org/news/sqlalchemy-makes-etl-magically-easy-ab2bd0df928/

##################################
## Define Schema (i.e. Create Classes)
##################################
#Create a class that describes each table in the database
#EXAMPLE HERE:
# class Energy_consumption_sector(Base):
#     __tablename__ = 'energy_consumption_sector'
#     __table_args__ = {'sqlite_autoincrement': True}
#     id = Column(Integer, primary_key=True, nullable=False)
#     State = Column(VARCHAR(40))
#     Residential = Column(Integer)
#     Commercial = Column(Integer)
#     Industrial = Column(Integer)
#     Transportation = Column(Integer)

#Energy_consumption_sector.__table__.create(bind=engine, checkfirst=True)


####################################
## Extract: Use SQLAlchemy to Load CSV data into Tables
####################################
#Within the if statement that will create the database using 
# the classes that have already been described (see above)


#EXAMPLE HERE:
 
# def load_1():
#     energy_consumption_sector_data = pd.read_csv("../data/Energy_Consumption_by_Sector_2017.csv")
#     energy_consumption_sector_data_list = energy_consumption_sector_data.values.tolist()
#     #print(energy_consumption_sector_data_list)
#     return energy_consumption_sector_data_list


##Create the session
# session = sessionmaker()
# session.configure(bind=engine)
# s = session()

# try:
#     data = load_1()
#     #print(data)
#     for i in data:
        
#         record = Energy_consumption_sector(**{
#                     'State' : i[0],
#                     'Residential' : i[1],
#                     'Commercial' : i[2],
#                     'Industrial' : i[3],
#                     'Transportation' : i[4]
#                         })
#         #print(record)
#         s.add(record) #Add all the records

#     s.commit() #Attempt to commit all the records   
# #http://docs.pyexcel.org/en/latest/showcases/db_injection.html
# except:
#     s.rollback() #Rollback the changes on error
#     print("there was an error in 1")
# finally:
#     s.close() #Close the connection
#     print("session is closed in 1")

