This directory contains backend code using MongooseDB

Content:
* Model - Model Classes for Goal and User
* Interface - Interface for GoalModel and User Model
* Enum - Enum Classes for Category, FavoriteView, and Progress
* DbClient.ts - mongo db client
* dbScripts - SampleData script to be uploadded on mongoDb

MongoDb is running online
Download MongoDB Compass and use the following string to access database
Connection String: 'mongodb+srv://Cluster96542:W15dQ3hlY1N2@cluster96542.kaymygv.mongodb.net/gogetter'

To execute the server db and then the node server with the following commands:

To run:
1. Take git clone: git clone -b mainV2 https://github.com/PreeGarg/GoGetter.git
2. Open terminal inside backend directory and run below commands
3. npm install
4. tsc (ignore any warning)
5. Run express/node server: node AppServer.js 

To test, open postman and copy below URLS
* http://localhost:8080/app/all-goals (GET)
* http://localhost:8080/app/all-users (GET)
* http://localhost:8080/app/user (GET + enter userId JSON in input payload)
* http://localhost:8080/app/user (POST + enter user info in JSON format in input payload)
