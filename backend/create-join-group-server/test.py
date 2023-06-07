from app import app, CreateGroup, GetUserIDBySession, CheckAndGetGroupID, JoinGroup, JoinGroupPage, db
from utils import *
from freezegun import freeze_time
import unittest
from unittest.mock import patch
from bson.objectid import ObjectId
import os

class MyResourceTestCase(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = app.test_client()
        cls.mycol_s = db["sessions"]
        cls.mycol_g = db["groups"]     
        cls.test_request_1 = {
            "session": "sexy session",
            "type": 0,
            "category": 0,
            "title": "屁眼大戰2",
            "descript": "一起來玩屁眼大戰吧!",
            "price": 3000,
            "end_date": "2023 06 15",
            "least": 2,
            "image": "https://i.imgur.com/3QXc8n3.jpg"
        }
        cls.test_request_2 = {
            "session": "play boy",
            "type": 0,
            "category": 0,
            "title": "屁眼大戰3",
            "descript": "一起來玩屁眼大戰吧!",
            "price": 3000,
            "end_date": "2023 06 15",
            "least": 2,
            "image": "https://i.imgur.com/3QXc8n3.jpg"
        }
        cls.test_response = {
            "msg": 0,
            "title": "屁眼大戰2",
            "price": 3000,
            "attend": 0,
            "least": 2,
            "time_left": "11 0 00 00",
            "descript":  "一起來玩屁眼大戰吧!"
        }
        cls.test_request_3 = {
            "session": "session3",
            "gid": "647afb8a52eb1a7b09c541ce",
            "number": 2
        }
        cls.test_request_4 = {
            "session": "session",
            "gid": "647b029252eb1a7b09c541e7",
            "number": 2
        }
        cls.test_request_5 = {
            "session": "session",
            "gid": "647afb8a52eb1a7b09c541ce",
            "number": 2
        }
        cls.session = "sexy session"
        cls.uid = ObjectId("647b029252eb1a7b09c541e7")
        cls.gid_1 = "647afb8a52eb1a7b09c541ce"
        cls.gid_2 = "647aaaaaaaaaaaaaaaaaaaaf"
        # cls.mycol_s.insert_one({"session": "session", "uid": cls.uid})
        cls.mycol_s.insert_one({"session": cls.session, "uid": cls.uid})
        # cls.group_1 = {
        #     "_id": ObjectId(cls.gid_1), 
        #     "title": "屁眼大戰", 
        #     "price": 3000, 
        #     "least": 2, 
        #     "end_date": "2023 06 15", 
        #     "attends": [], 
        #     "descript": "一起來玩屁眼大戰吧！", 
        #     # "leader": cls.uid,
        #     "type": 0,
        #     "category": 0,
        #     "image": "https://i.imgur.com/3QXc8n3.jpg"
        # }
        # cls.mycol_g.insert_one(cls.group_1)

    @freeze_time("2023-06-4")
    def test_get_left_time(self):
        end_date_1 = "2023 06 07"
        left_time = GetLeftTime(end_date_1)
        self.assertEqual(left_time, "3 0 00 00")
        end_date_1 = "2023 06 04"
        left_time = GetLeftTime(end_date_1)
        self.assertEqual(left_time, "0 0 00 00")

    @patch("requests.get")
    def test__IsTitleExist(self, mock_get):
        resource = CreateGroup()
        mock_get.return_value.json.return_value = [
            {"title": "Title 1"},
            {"title": "Title 2"},
            {"title": "Title 3"}
        ]
        result = resource._CreateGroup__IsTitleExist("Title 2")
        self.assertTrue(result)
        expected_url = f"{os.environ.get('EVENT_SEARCH_API')}?title=Title 2"
        mock_get.assert_called_with(expected_url)

    def test_GetUserIDBySession(self):
        result = GetUserIDBySession(self.session)
        self.assertEqual(result, self.uid)
        self.session = "sexy session2"
        result = GetUserIDBySession(self.session)
        self.assertIsNone(result)

    @patch("requests.get")
    def test_creategroup_post(self, mock_get):
        # response = self.client.post('/create', json=self.test_request_1)
        # self.assertEqual(response.status_code, 201)
        # self.assertEqual(response.json, {"msg": 0})
    #     response = self.client.post('/create', json=self.test_request_1)
    #     self.assertEqual(response.status_code, 406)
    #     self.assertEqual(response.json, {"msg": 1})
        response = self.client.post('/create', json=self.test_request_2)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"msg": 2})
        expected_url = f"{os.environ.get('EVENT_SEARCH_API')}?title={self.test_request_2['title']}"
        mock_get.assert_called_with(expected_url)

    # def test_creategroup_post_2(self, mock_get):
    #     with patch('your_module.function1') as mock_function1, \
    #         patch('your_module.function2') as mock_function2:
    #         response = self.client.post('/create', json=self.test_request_2)
    #         self.assertEqual(response.status_code, 404)
    #         self.assertEqual(response.json, {"msg": 2})
    #         expected_url = f"{os.environ.get('EVENT_SEARCH_API')}?title={self.test_request_2['title']}"
    #         mock_get.assert_called_with(expected_url)

    # def test_CheckAndGetGroupID(self):
    #     result = CheckAndGetGroupID(self.gid_2)
    #     self.assertIsNone(result)
    #     result = CheckAndGetGroupID(self.gid_1)
    #     self.assertIsInstance(result, ObjectId)
    
    # def test__PushGroup(self):
    #     origin = len(self.mycol_g.find_one({"_id": ObjectId(self.gid_1)})['attends'])
    #     resource = JoinGroup()
    #     resource._JoinGroup__PushGroup(ObjectId(self.gid_1), self.uid, 4)
    #     self.assertEqual(len(self.mycol_g.find_one({"_id": ObjectId(self.gid_1)})['attends']), origin+1)

    # def test_joingroup_post(self):
    #     response = self.client.post('/join', json=self.test_request_3)
    #     self.assertEqual(response.status_code, 404)
    #     self.assertEqual(response.json, {"msg": 2})
    #     response = self.client.post('/join', json=self.test_request_4)
    #     self.assertEqual(response.status_code, 404)
    #     self.assertEqual(response.json, {"msg": 1})
    #     response = self.client.post('/join', json=self.test_request_5)
    #     self.assertEqual(response.status_code, 201)
    #     self.assertEqual(response.json, {"msg": 0})
    
    # def test_joingrouppage_get(self):
    #     response = self.client.get('/join_page', json={"gid": self.gid_1})
    #     print(response.json)
    #     self.assertEqual(response.status_code, 200)

    @classmethod
    def tearDownClass(cls) -> None:
        # cls.mycol_g.delete_one({"title": "屁眼大戰2"})
        # cls.mycol_s.delete_one({"session": "session", "uid": cls.uid})
        cls.mycol_s.delete_one({"session": cls.session, "uid": cls.uid})
        # cls.mycol_g.delete_one({"_id": ObjectId(cls.gid_1)})

if __name__ == '__main__':
    unittest.main(verbosity=2) # pragma: no cover