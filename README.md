# Telepathy API 💭
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Telepathy is a social network backend (API) where users can create a friend list, share their thoughts, and react to their friends' thoughts! This API uses Express.js for routing, MongoDB as the database, and Mongoose as the Object Data Modeling (ODM) library. This API also uses the native Javascript ``Date`` object and moment.js to format timestamps. To learn more about Telepathy API, read throught the documentation below.

## Table of Contents
1. [Description](#description)
2. [Table of Contents](#table-of-contents)
3. [Usage](#usage)
4. [Installation](#installation)
5. [License](#license)
6. [Technologies Employed](#technologies-employed)
7. [Future Development](#future-development)
8. [Contributing](#contributing)
9. [Tests](#tests)
10. [Questions](#questions)

## Usage
### User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

### Acceptance Criteria 

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation
To run Telepathy API 💭 locally:

1. Pull down and/or branch this repository
2. Run ```npm i``` to install all dependencies
3. Seed the database by running ```npm run seed```
4. Run the app with ```npm run start``` </br> or ```npm run dev``` for nodemon
</br>
This application has not been deployed. The following animations show the API being invoked and seeded:

https://user-images.githubusercontent.com/107900180/201265071-0b9267d4-f5b6-4638-b77e-e4fab1f2e403.mp4


<br/>
The following animations show examples of the application's API routes being tested in Insomnia:
(GET, POST, PUT, DELETE)




https://user-images.githubusercontent.com/107900180/206577338-8ee00c1b-6f34-4fee-ae80-531daa28a890.mp4







## License
This project is licensed under the MIT license.

A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.<p/>For more information visit [MIT Licensing](https://choosealicense.com/licenses/mit/).

## Technologies Employed
* JavaScript
* MongoDB
* Node.js
* Express.js
* Mongoose
* Moment.js

## Future Development
We would like to continue to add the following functionality to our application:
- Active counter for all thoughts
- Active counter for all friends
- Delete associated thoughts when user is deleted &check;

## Contributing
We'd love for you to contribute! In order to do so, fork this repository. Your pull request will need approval in order to merge to ```main```. <br/><br/> Take a look at our [Future Development](#future-development) section to see what we are looking to expand on (implemented features are denoted with a &check;). Feel free to implement your own ideas and merge request!

## Tests
No tests were run to complete this API.

## Questions
Find Insha Sayani on [GitHub](https://github.com/isayani)<br/>
Or visit the API's repository: [Telepathy API 💭](https://github.com/isayani/no-sql-social-network)

- - -
© 2022 Telepathy 💭: Social Network API by ISayani Creative Services, Confidential and Proprietary. All Rights Reserved.
