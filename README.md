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
upon Registering on the website. We used the following npm command to install
the SendGrid module:

> $ npm install --save @sendgrid/mail

We then implement the following code in our entry-point file:
> const sgMail = require('@sendgrid/mail')
>sgMail.setApiKey(process.env.SENDGRID_API_KEY)
>
>const msg = {
>  to: 'test@example.com', // Change to your recipient<br />
>  from: 'test@example.com', // Change to your verified sender<br />
>  subject: 'Sending with SendGrid is Fun',<br />
>  text: 'and easy to do anywhere, even with Node.js',<br />
>  html: '<strong>and easy to do anywhere, even with Node.js</strong>',<br />
>}
>
>sgMail<br />
>  .send(msg)<br />
>  .then((response) => {<br />
>    console.log(response[0].statusCode)<br />
>    console.log(response[0].headers)<br />
>  })<br />
>  .catch((error) => {<br />
>    console.error(error)<br />
>  })<br />


