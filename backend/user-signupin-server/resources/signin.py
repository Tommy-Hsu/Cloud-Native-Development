import os
from pymongo import MongoClient
from flask_restful import Api, Resource, reqparse
from schema import Schema, And, Use, Optional
from bson.objectid import ObjectId

class SigninUser(Resource):
  
    parser = reqparse.RequestParser()
    parser.add_argument('email', required=True, help='Email is required')
    parser.add_argument('password', required=True, help='Password is required')

    def post(self): # 這邊是測試用的，之後要改成 post

        data = SigninUser.parser.parse_args()
        # Mongo DB:
        targetdb = "test"
        targetcol = "emails"
        mydict = { 
            "email"     : data['email'], 
            "password"  : data['password']
        }

        myclient = MongoClient(os.environ.get("ATLAS_URI"))
        dblist = myclient.list_database_names()

        if targetdb in dblist:
            database = myclient[targetdb]
            collist = database.list_collection_names()
        else:
            return "Database not found", 404

        if targetcol in collist:
            mycol = database[targetcol]
            if mycol.find_one({"email" : data['email'], 'password': data['password']}): # 檢查是否有重複的 email
                return {'msg': 0}, 201
            else:
                return {'msg': 1}, 409
        else:
            return "Collection not found", 404
        