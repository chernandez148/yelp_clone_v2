#!/usr/bin/env python3
from faker import Faker

# Local imports
from app import app
from config import db
from models import User, Review, Business
fake = Faker()

with app.app_context():

    print("Starting seed...")
    # Seed code goes here!

    print('Deleting existing data...')
    User.query.delete()
    Review.query.delete()
    Business.query.delete()
    
    # create seed data for User model
    for i in range(10):
        user = User(
            fname=fake.first_name(),
            lname=fake.last_name(),
            email=fake.email(),
            _password_hash=fake.password(),
        )
        db.session.add(user)

    # create seed data for Business model
    for i in range(10):
        business = Business(
            business_name=fake.company(),
            business_number=fake.numerify('###-###-####'),
            business_address=fake.street_name(),
            business_city=fake.city(),
            business_state=fake.state(),
            business_zipcode=fake.zipcode(),
            business_category=fake.random_element(elements=('Food & Dining', 'Automotive', 'Retailer', 'Computers & Electronics', 'Entertainment', 'Health & Medicine', 'Education', 'Home & Garden', 'Legal & Financial', 'Manufacturing, Wholesale, Distribution', 'Personal Care & Services', 'Real Estate', 'Travel & Transportation', 'Other')),
            business_description=fake.text(),
            business_owner_id=fake.random_element(elements=User.query.all()).id
        )
        db.session.add(business)

    # create seed data for Review model
    for i in range(10):
        review = Review(
            rating=fake.random_int(min=1, max=5),
            review=fake.text(),
            business_id=fake.random_element(elements=Business.query.all()).id,
            user_id=fake.random_element(elements=User.query.all()).id
        )
        db.session.add(review)


    db.session.commit()
