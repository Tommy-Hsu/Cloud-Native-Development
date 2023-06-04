from pymongo import MongoClient
from app import server
import unittest
import json
import os

class MyResourceTestCase(unittest.TestCase):
        
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = server.test_client()
        cls.payload1 = {
            'email': 'openai@gmail.com', 
            'password': '123456',
            }
        cls.payload2 = {
            'email': 'hscclab2@gmail.com', 
            'password': '123456',
            }

    def test_signup_post_request(self):
        response = self.client.post('/signup', json=self.payload1)
        self.assertEqual(201, response.status_code)
        self.assertEqual({'msg': 0}, json.loads(response.data.decode('utf-8')))

    def test_signup_post_request_with_existing_email(self):
        response = self.client.post('/signup', json=self.payload1)
        self.assertEqual(409, response.status_code)
        self.assertEqual({'msg': 1}, json.loads(response.data.decode('utf-8')))

    def test_signin_post_request(self):
        response = self.client.post('/signup', json=self.payload2)
        response = self.client.post('/signin', json=self.payload2)
        self.assertEqual(200, response.status_code)
        self.assertEqual({'msg': 0}, json.loads(response.data.decode('utf-8')))
    
    def test_signin_post_request_with_wrong_password(self):
        response = self.client.post('/signin', json = {'email': self.payload2['email'], 'password': '1234567'})
        self.assertEqual(409, response.status_code)
        self.assertEqual({'msg': 1}, json.loads(response.data.decode('utf-8')))
    
    @classmethod
    def tearDownClass(cls) -> None:
        myclient = MongoClient(os.environ.get("MONGODB_URL"))
        database = myclient["CillTan"]
        mycol = database["users"]
        mycol.delete_one(cls.payload1)
        mycol.delete_one(cls.payload2)

if __name__ == '__main__':
    unittest.main() # pragma: no cover