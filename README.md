# Boulder Climb App REV 2
## Introduction
As a climber that frequently visits indoor climbing gyms, I’ve always wanted an application to visualize what climbing routes were available at my local gym and a way to track/manage my climbing progress. In _Boulder Climb_, I have created a full-stack application for doing just that! In this example application, Boulder Climb represents an existing climbing climbing gym franchise. The application uses authentication and authorization to distinguish whether or not the user that logs in is a general member (default) or an employee(pre-set, see below for login info).

Click [HERE](https://www.youtube.com/watch?v=p1tCp2awO04) for a video demonstration!

## User Experience
The Boulder Climb App has two distinct user types: _General User_ and an _Employee_. 

### _Employee_
As an Employee of Boulder Climb, I can expect to do the following:
-   View an interactive map in which you can create new routes or update existing active routes. The interactive map ONLY displays routes that are set as 'Active'.
-	View a table of ALL climbing routes, as long as they have not been deleted. From this table, a user can viaulize how populare a route is and make active again. They can also click a button to route back to the interactive map.
-	Sort each route by the columns provided in the table.
-   Upload and View videos on how to effectively climb or 'beta' a route.
-	Add, Edit, or Delete any climbing route information.

In order to view the Employee user page, type in the following credentials of an existing _Employee_ under the Login Page of the application:

Username: employeeJim OR employeeJack
password: password  

### _General User_
A _General User_ of Boulder Climb is supposed to represent the typical member of a rock climbing gym. As a member, I can expect to do the following:
- Sign up at the login page if it's your first time or simply login if an account has already been created.
- Navigate between Home, Current Routes, and Climbed Routes in the Navbar located at the top of the page. 
- As a user climbs more and more routes, the statistics on the home page will update, allowing the user to visually see progress as they climb.
- Use interactive map to view information about each route.
- “like” or “climb” a route under the current routes page
- Upon clicking the “climb” button on the Current Routes page, a table of Climbed Routes becomes populated with information on each route that the user can always access. Additionally, for each climbing route, there’s an option to “Prove It” in which the user can upload a video of themselves climbing the route to prove that they have indeed climbed the route!

## Starting Application
First, you will need to create a virtual environment for this Python application. The main directory of this project, open up your terminal and type the following command:
```
pipenv install
pipenv shell
```

Now that you are in the virtual environment, the following commands must be completed in the user terminal upon initial startup. Once in the parent directory, *cd* into the `server` directory and type the following commands:

```
python seed.py
python app.py
```

This will establish the backend development server so the front end can properly pull the information provided by the seed data.

Next, open a new terminal and *cd* into the `client` directory. Type the following commands:
```
npm start
```

Immediately following the command listed previously, the web application should start up and you should be able to use *Boulder Climb* as described above.# Boulder_Climb_Rev2
