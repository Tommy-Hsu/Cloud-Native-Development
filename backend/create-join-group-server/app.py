import os

from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient
from bson.objectid import ObjectId

from utils import *


# Mongo DB:
client = MongoClient(os.environ.get("MONGO_URI"))
db = client.CillTan

# Flask app:
app = Flask(__name__)
CORS(app)

# Api object:
api = Api(app)


# Some methods:
def GetUserIDBySession(session: str) -> ObjectId:
    doc = db.sessions.find_one({"session": session}, {"uid": 1, "_id": 0})
    if doc:
        return doc["uid"]
    
    return None


def CheckAndGetGroupID(gidString: str) -> ObjectId:
    gid = ObjectId(gidString)
    if db.groups.find_one({"_id": gid}):
        return gid
    
    return None


# Api resources:
class CreateGroup(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("session" , type=str, required=True, help="user session required")
    parser.add_argument("type"    , type=int, required=True, help="group type required")
    parser.add_argument("category", type=int, required=True, help="category required")
    parser.add_argument("title"   , type=str, required=True, help="group name required")
    parser.add_argument("descript", type=str, required=True, help="group descript required")
    parser.add_argument("price"   , type=int, required=True, help="price required")
    parser.add_argument("end_date", type=str, required=True, help="end date required")
    parser.add_argument("least"   , type=int, required=True, help="least number of people required")

    def post(self):
        data = CreateGroup.parser.parse_args()
        if self.__IsTitleExist(data["title"]):
            return {"msg": 1}, 406

        if not (uid := GetUserIDBySession(data["session"])):
            return {"msg": 2}, 404

        data.pop("session")
        data["leader"] = uid
        data["attends"] = []
        db.groups.insert_one(data)
        return self.__MakeResponseGroupInfo(data), 201

    def __IsTitleExist(self, title: str):
        return db.groups.count_documents({"title": title}) > 0
    
    def __MakeResponseGroupInfo(self, data: dict):
        return {
            "msg"      : 0,
            "title"    : data["title"],
            "price"    : data["price"],
            "attend"   : 0,
            "least"    : data["least"],
            "time_left": GetLeftTime(data["end_date"]),
            "descript" : data["descript"]
        }
    

class JoinGroup(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("session", type=str, required=True, help="user session required")
    parser.add_argument("gid"    , type=str, required=True, help="ID of group required")
    parser.add_argument("number" , type=int, required=True, help="number required")

    def post(self):
        data = JoinGroup.parser.parse_args()
        if (uid := GetUserIDBySession(data["session"])) is not None:
            if (gid := CheckAndGetGroupID(data["gid"])):
                self.__PushGroup(gid, uid, data["number"])
                return {"msg": 0}, 201
            
            return {"msg": 1}, 404
        
        return {"msg": 2}, 404

    def __PushGroup(self, gid: ObjectId, uid: ObjectId, number: int):
        db.groups.update_one({"_id": gid}, {"$push": {"attends": {"uid": uid, "number": number}}})


class JoinGroupPage(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("gid", type=str, required=True, help="ID of group required")

    def get(self):
        gid = JoinGroupPage.parser.parse_args()["gid"]
        groupData = db.groups.find_one({"_id": ObjectId(gid)}, {"_id": 0, "title": 1, "price": 1, "attend": 1, "least": 1, "time_left": 1, "descript": 1})
        if groupData:
            groupData.pop("_id")
            groupData["msg"] = 0
            return groupData, 200
        else:
            return {"msg": 1}, 404


api.add_resource(CreateGroup  , "/create")
api.add_resource(JoinGroup    , "/join")
api.add_resource(JoinGroupPage, "/join_page")


if __name__ == "__main__":

    app.run()
