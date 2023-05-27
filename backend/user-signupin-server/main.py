from flask import Flask
from flask_restful import Api, Resource, reqparse
from resources.signup import CreateUser
from resources.signin import SigninUser

# Flask app config:
server = Flask(__name__)

# Api object:
api = Api(server)

api.add_resource(CreateUser, "/signup")
api.add_resource(SigninUser, "/signin")

if __name__ == "__main__":
  server.run()