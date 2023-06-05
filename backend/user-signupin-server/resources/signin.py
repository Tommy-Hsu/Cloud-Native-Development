import os
from pymongo import MongoClient
from flask import jsonify, make_response
from flask_restful import Api, Resource, reqparse

class SigninUser(Resource):
  
    parser = reqparse.RequestParser()
    parser.add_argument('email', required=True, help='Email is required')
    parser.add_argument('password', required=True, help='Password is required')

    def post(self): # 這邊是測試用的，之後要改成 post

        data = SigninUser.parser.parse_args()
        # Mongo DB:
        targetdb = "CillTan"
        targetcol = "users"
        mydict = { 
            "email"     : data['email'], 
            "password"  : data['password']
        }

        myclient = MongoClient(os.environ.get("MONGODB_URL"))
        dblist = myclient.list_database_names()

        if targetdb in dblist:
            database = myclient[targetdb]
            collist = database.list_collection_names()
        else: # pragma: no cover
            return "Database not found", 404

        if targetcol in collist:
            mycol = database[targetcol]
            if mycol.find_one(mydict): # 檢查是否有重複的 email
                uid = mycol.find_one(mydict)['_id']
                database.sessions.insert_one({"uid": uid, "session": str(uid)})
                response = make_response(jsonify({'msg': 0, "session": str(uid)}))
                response.status_code = 200
                return response
            else:
                response = make_response(jsonify({'msg': 1}))
                response.status_code = 409
                return response
        else: # pragma: no cover
            return "Collection not found", 404
        
