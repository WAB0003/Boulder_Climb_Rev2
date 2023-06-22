#!/usr/bin/env python3

from random import randint, choice

from faker import Faker

from app import app
from models import db, User, Gym, Like, Route, Climb

fake = Faker()

def make_users():

    User.query.delete()
    print("Deleted all users...")
    climberBill = User(first_name="Bill", last_name="Brown", username="climberBill", password_hash="password", current_gym_id=1)
    employeeJack = User(first_name="Jack", last_name="Daniels", username="employeeJack", admin=True, password_hash="password", current_gym_id=1)
    employeeJim = User(first_name="Jim", last_name="Beam", username="employeeJim", admin=True, password_hash="password", current_gym_id=2)
    climberTom = User(first_name="Tom", last_name="Jones", username="climberTom", password_hash="password", current_gym_id=1)
    

    db.session.add_all([climberBill, employeeJack, employeeJim, climberTom])
    db.session.commit()
    print("Created 4 standard users...")
    
    
def make_gyms():
    Gym.query.delete()
    print("Deleted all users...")
    
    gym1 = Gym(name="Poplar", street="900 Poplar PI St", city="Seattle", state="WA", zipcode="98144", phone=5555555555)
    gym2 = Gym(name="Fremont",  street="3535 Interlake Ave N", city="Seattle", state="WA", zipcode="98103", phone=5555555555)
    
    db.session.add_all([gym1, gym2])
    db.session.commit()
    print("Created 2 standard gyms...")

def make_routes():
    Route.query.delete()
    print("Deleted all routes...")
    
    route_list = []
    
    route1 = Route(name="Big Cheesey", xPosition=27.56066571224051, yPosition=49.95443702290076, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route1)
    
    route2 = Route(name="TableTop", xPosition=27.131173944166072, yPosition=32.5880248091603, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route2)
    
    route3 = Route(name="Spanky", xPosition=40.159090909090914, yPosition=32.206345419847324, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route3)
    
    route4 = Route(name="Gandalf", xPosition=40.30225483178239, yPosition=49.57275763358779, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route4)
    
    route5 = Route(name="The Doozy", xPosition=58.48407301360058, yPosition=38.88573473282443, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route5)
    
    route6 = Route(name="Plot Twist", xPosition=63.35164638511096, yPosition=73.23687977099237, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route6)
    
    route7 = Route(name="Dirty Dude", xPosition=68.79187544738727, yPosition=52.24451335877863, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route7)
    
    route8 = Route(name="Coles Crack", xPosition=90.69595561918396, yPosition=44.801765267175576, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route8)
    
    route9 = Route(name="Cougarmilk", xPosition=10.81048675733715, yPosition=15.794131679389311, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route9)
    
    route10 = Route(name="Cowardly Lion", xPosition=28.849141016463847, yPosition=56.252146946564885, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    route_list.append(route10)
    
    db.session.add_all(route_list)
    db.session.commit()
    print('routes created...')
    
    
def make_likes():
    Like.query.delete()
    print("Delete existing likes table...")
    
    like1 = Like(user_id=1, route_id=3)
    like2 = Like(user_id=1, route_id=4)
    like3 = Like(user_id=1, route_id=1)
    like4 = Like(user_id=1, route_id=6)
    like5 = Like(user_id=4, route_id=6)
    like6 = Like(user_id=4, route_id=2)
    like7 = Like(user_id=4, route_id=3)
    
    db.session.add_all([like1, like2, like3, like4, like5, like6, like7])
    db.session.commit()
    print("created some likes...")
    
def delete_climbs():
    Climb.query.delete()
    print("Delete climb table...")
    Bill_active_routes = Route.query.filter((Route.active ==True) and (Route.gym_id == 1)).all()
    # print(example_route.id)
    oneClimbExammple = Climb(user_video="userVideos/xzobitatj9ifzjx5insk", user_id = 1, route_id=Bill_active_routes[0].id)
    twoClimbExammple = Climb(user_video="userVideos/zdawjf772wf9ldo8bab6", user_id = 1, route_id=Bill_active_routes[1].id)
    threeClimbExammple = Climb(user_video="userVideos/f2odjzxi2u86jogucl7k", user_id = 1, route_id=Bill_active_routes[2].id)
    db.session.add_all([oneClimbExammple, twoClimbExammple,threeClimbExammple])
    db.session.commit()
    
    print("created some climbs for climber Bill...")
        
        
    
    # import ipdb; ipdb.set_trace()


if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_gyms()
        make_routes()
        make_likes()
        delete_climbs()
