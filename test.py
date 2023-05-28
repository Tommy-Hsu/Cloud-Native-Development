import unittest
import json
from pymongo import MongoClient
import requests

class MyResourceTestCase(unittest.TestCase):

    def setUp(self):
        self.payload = {
            'email': 'hscclab@gmail.com', 
            'password': '123456',
            }

    def test_signup_post_request(self):
        response = requests.post('http://127.0.0.1:8081/signup', headers={"Content-Type": "application/json"}, data=json.dumps(self.payload))
        self.assertEqual(201, response.status_code)
        self.assertEqual({'msg': 0}, response.json())
        
    def test_signup_post_request_with_existing_email(self):
        response = requests.post('http://127.0.0.1:8081/signup', headers={"Content-Type": "application/json"}, data=json.dumps(self.payload))
        self.assertEqual(409, response.status_code)
        self.assertEqual({'msg': 1}, response.json())
    
    def tearDown(self) -> None:
        # myclient = MongoClient(os.environ.get("ATLAS_URI"))
        # print(os.environ.get("ATLAS_URI"))
        # print(myclient.list_database_names())
        # database = myclient["test"]
        # print(database.list_collection_names())
        # mycol = database["emails"]
        # print(mycol.find_one(self.payload))
        return super().tearDown()

if __name__ == '__main__':
    unittest.main()