from flask import Flask
import os
from flask_restful import Api, Resource, reqparse
from resources.signup import CreateUser
from resources.signin import SigninUser
from flask_cors import CORS

# Flask app config:

server = Flask(__name__)
CORS(server, supports_credentials=True)
# Api object:
api = Api(server)

api.add_resource(CreateUser, "/signup")
api.add_resource(SigninUser, "/signin")

if __name__ == "__main__":
  server.run(port=5000) # pragma: no cover