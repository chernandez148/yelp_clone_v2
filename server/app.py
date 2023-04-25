#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify, abort
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Review, Business

# Views go here!

class Users(Resource):
    def get(self):
        user = [u.to_dict() for u in User.query.all()]
        return make_response(jsonify(user), 200)
    
api.add_resource(Users, '/users')

class Reviews(Resource):
    def get(self):
        review = [r.to_dict() for r in Review.query.all()]
        return make_response(jsonify(review), 200)

api.add_resource(Reviews, '/reviews')

class Businesses(Resource):
    def get(self):
        business = [b.to_dict() for b in Business.query.all()]
        return make_response(jsonify(business), 200)

api.add_resource(Businesses, '/businesses')

class SignUp(Resource):
    def post(self):
        form_json = request.get_json()
        try:
            new_user = User(
                fname=form_json["fname"],
                lname=form_json["lname"],
                account_type=form_json["account_type"],
                email=form_json["email"],
                password=form_json["password"],
            )
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            response_dict = new_user.to_dict()
            return jsonify(response_dict), 201
        except ValueError as e:
            abort(422, e.args[0])
        except IntegrityError as e:
            db.session.rollback()
            abort(422, "Email already exists.")

api.add_resource(SignUp, "/signup")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
