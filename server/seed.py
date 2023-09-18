#!/usr/bin/env python3

from random import randint, choice

from faker import Faker

from app import app
from models import db, User, Gym, Like, Route, Climb

fake = Faker()

def delete_Tables():
    User.query.delete()
    print("Deleted all users...")
    Gym.query.delete()
    print("Deleted all Gyms...")
    Route.query.delete()
    print("Deleted all routes...")
    Climb.query.delete()
    print("Delete climb table...")
    Like.query.delete()
    print("Delete existing likes table...")
    
def make_gyms():
    gym1 = Gym(name="Poplar", street="900 Poplar PI St", city="Seattle", state="WA", zipcode="98144", phone=555)
    gym2 = Gym(name="Fremont",  street="3535 Interlake Ave N", city="Seattle", state="WA", zipcode="98103", phone=555)
    # import ipdb; ipdb.set_trace()
    db.session.add_all([gym1, gym2])

    db.session.commit()
    print("Created 2 standard gyms...")
    

def make_users():
    allGyms = Gym.query.all()
    # import ipdb; ipdb.set_trace()
    climberBill = User(first_name="Bill", last_name="Brown", username="climberBill", password_hash="password", current_gym_id=allGyms[0].id)
    employeeJack = User(first_name="Jack", last_name="Daniels", username="employeeJack", admin=True, password_hash="password", current_gym_id=allGyms[0].id)
    employeeJim = User(first_name="Jim", last_name="Beam", username="employeeJim", admin=True, password_hash="password", current_gym_id=allGyms[1].id)
    climberTom = User(first_name="Tom", last_name="Jones", username="climberTom", password_hash="password", current_gym_id=allGyms[1].id)
    
    
    db.session.add_all([climberBill, employeeJack, employeeJim, climberTom])
    db.session.commit()
    print("Created 4 standard users...")
    
    


def make_routes():
    employees = User.query.all()
    gyms = Gym.query.all()
    
    route_list = []
    route1 = Route(name="Big Cheesey", xPosition="50.354166666666664", yPosition="36.166666666666664", rating=1, video_url="userVideos/RedRoute", setter_id=choice([employees[1].id,employees[2].id]), gym_id=choice([gyms[0].id,gyms[1].id]), active=True)
    route_list.append(route1)
    
    route2 = Route(name="TableTop", xPosition="44.135908440629464", yPosition="35.49809160305343", rating=0, video_url="userVideos/YellowRoute", setter_id=choice([employees[1].id,employees[2].id]), gym_id=choice([gyms[0].id,gyms[1].id]), active=True)
    route_list.append(route2)
    
    route3 = Route(name="Spanky", xPosition="27.25464949928469", yPosition="36.45229007633588", rating=3, video_url="userVideos/PurpleRoute", setter_id=choice([employees[1].id,employees[2].id]), gym_id=choice([gyms[0].id,gyms[1].id]), active=True)
    route_list.append(route3)
    
    # route4 = Route(name="Gandalf", xPosition=40.30225483178239, yPosition=49.57275763358779, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    # route_list.append(route4)
    
    # route5 = Route(name="The Doozy", xPosition=58.48407301360058, yPosition=38.88573473282443, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    # route_list.append(route5)
    
    # route6 = Route(name="Plot Twist", xPosition=63.35164638511096, yPosition=73.23687977099237, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    # route_list.append(route6)
    
    # route7 = Route(name="Dirty Dude", xPosition=68.79187544738727, yPosition=52.24451335877863, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    # route_list.append(route7)
    
    # route8 = Route(name="Coles Crack", xPosition=90.69595561918396, yPosition=44.801765267175576, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    # route_list.append(route8)
    
    # route9 = Route(name="Cougarmilk", xPosition=10.81048675733715, yPosition=15.794131679389311, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    # route_list.append(route9)
    
    # route10 = Route(name="Cowardly Lion", xPosition=28.849141016463847, yPosition=56.252146946564885, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
    # route_list.append(route10)
    
    db.session.add_all(route_list)
    db.session.commit()
    print('routes created...')
    
    
def make_likes():
    climberBill = User.query.first()
    routes = Route.query.all()
    
    like1 = Like(user_id=climberBill.id, route_id=routes[0].id)
    like2 = Like(user_id=climberBill.id, route_id=routes[1].id)
 
    
    db.session.add_all([like1, like2])
    db.session.commit()
    print("created some likes...")
    
def make_climbs():

    # Bill_active_routes = Route.query.filter((Route.active ==True)).all()
    # print(example_route.id)
    # oneClimbExammple = Climb(user_video="userVideos/RedRoute", user_id = 1, route_id=Bill_active_routes[0].id)
    # twoClimbExammple = Climb(user_video="userVideos/PurpleRoute", user_id = 1, route_id=Bill_active_routes[1].id)
    # threeClimbExammple = Climb(user_video="userVideos/YellowRoute", user_id = 1, route_id=Bill_active_routes[2].id)
    # db.session.add_all([oneClimbExammple, twoClimbExammple,threeClimbExammple])
    # db.session.commit()
    
    print("created some climbs for climber Bill...")
        
        
    
    # import ipdb; ipdb.set_trace()


if __name__ == '__main__':
    with app.app_context():
        delete_Tables()
        make_gyms()
        make_users()
        make_routes()
        make_likes()
        make_climbs()
