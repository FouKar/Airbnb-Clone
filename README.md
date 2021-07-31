# Web322-A2
Assignment 2 for WEB322

##  Express-Handlebars Views
* Home Page
* Room Listings Page
* Login Page
* Registration Page

## Form Validation
For Assignment 2, we are validating the Login and Registration Forms on the server-side.

In order to accomplish this task, I used the body-parser middleware. Here is the npm command
that we used to install body-parser middleware:
> $ npm install body-parser

And then we implement the following code in our entry-point file
>  const bodyParser = require('body-parser')

## Sendgrid - Email on Registration
For this assignment, we used the SendGrid API to send emails to the client
upon Registering on the website. 


## User Registration and Authentication, 
For assignment 3, we are registering the users on a MongoDB Database. In order to do this we used Mongoose module:
>$ npm install mongoose

For User authentication and encryption we used the middleware, bCrypt:
>$ npm install bCrypt

## User Sessions
For creating, destroying and validating user sessions, we used the middleware express-sessions:
>$ npm install express-sessions
