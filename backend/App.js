"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const GoalModel_1 = require("./model/GoalModel");
const UserModel_1 = require("./model/UserModel");
// import crypto module from Node.js to create Hash
const crypto = require('crypto');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Goals = new GoalModel_1.GoalModel();
        this.Users = new UserModel_1.UserModel();
    }
    generateUUIDNumber() {
        let uuid = '';
        const uuidChars = '0123456789abcdef';
        // Generate a random UUID string
        for (let i = 0; i < 32; i++) {
            const randomChar = Math.floor(Math.random() * 16);
            const char = uuidChars[randomChar];
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += char;
        }
        // Use SHA256 to hash UUID to provide stronger security 
        const hash = crypto.createHash('sha256');
        hash.update(uuid);
        return hash.digest('hex');
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        //--------------------------------------------GOAL CRUD--------------------------------------
        // Create a goal
        // POST: http://localhost:8080/app/goal
        router.post('/app/goal', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var newGoalInfo = req.body;
            newGoalInfo.goalId = crypto.randomBytes(16).toString("hex"); // generate random ID to assign to new user 
            console.log('Create new goal with goalId:' + newGoalInfo.goalId);
            this.Goals.createNewGoal(res, newGoalInfo);
        }));
        // Retrieve all goals
        // GET: http://localhost:8080/app/goals
        // GET: http://localhost:8080/app/goals?category=Health
        // GET: http://localhost:8080/app/goals?progress=In Progress
        router.get('/app/goals', (req, res) => {
            if (req.query.hasOwnProperty('category')) {
                const _category = req.query.category;
                console.log('Category: ' + _category);
                this.Goals.retrieveGoalsbyProperties(res, { category: _category });
            }
            else if (req.query.hasOwnProperty('progress')) {
                const _progress = req.query.progress;
                console.log('Progress: ' + _progress);
                this.Goals.retrieveGoalsbyProperties(res, { progress: _progress });
            }
            else {
                console.log('Query all goals');
                this.Goals.retrieveAllGoals(res);
            }
        });
        // Retrieve one goal by goalId
        // GET: http://localhost:8080/app/goals/1
        router.get('/app/goals/:goalId', (req, res) => {
            var id = req.params.goalId;
            console.log('GoalId: ' + id);
            this.Goals.retrieveGoalsDetails(res, { goalId: id });
        });
        // Update one goal for one user
        // PUT: http://localhost:8080/app/goals/1
        router.put('/app/goals/:goalId', (req, res) => {
            const id = req.params.goalId;
            const goalUpdate = req.body;
            const filter = { goalId: id };
            this.Goals.createOrUpdateGoal(res, filter, goalUpdate);
        });
        // Delete one goal for one user
        // DELETE: http://localhost:8080/app/goals/1
        router.delete('/app/goals/:goalId', (req, res) => {
            var id = req.params.goalId;
            console.log('GoalId to be deleted: ' + id);
            this.Goals.deleteGoal(res, { goalId: id });
        });
        //--------------------------------------------USER CRUD--------------------------------------
        // Create a user
        // http://localhost:8080/app/user (user info as JSON in input payload)
        router.post('/app/user/', (req, res) => {
            var newUserInfo = req.body;
            var newUserEmail = newUserInfo.email; // email will be used to check for existing user
            newUserInfo.userId = crypto.randomBytes(16).toString("hex"); // generate random ID to assign to new user 
            console.log('Add new user to database');
            this.Users.createNewUser(res, newUserInfo, { email: newUserEmail });
        });
        // Retrieve all users
        // http://localhost:8080/app/users
        router.get('/app/users/', (req, res) => {
            console.log('Query all users');
            this.Users.retrieveAllUsers(res);
        });
        // Retrieve one user by userId
        // http://localhost:8080/app/users/1
        router.get('/app/users/:userId', (req, res) => {
            var id = req.params.userId;
            console.log('Query user with ID ' + id);
            this.Users.retrieveUserDetails(res, { userId: id });
        });
        // Update one user by userId
        // http://localhost:8000/app/users/2 (user info in JSON in input payload)
        router.put('/app/users/:userId', (req, res) => {
            const id = req.params.userId;
            const userUpdate = req.body;
            console.log('Update info for user with ID ' + id);
            this.Users.updateUserDetails(res, userUpdate, { userId: id });
        });
        // Delete one user
        // http://localhost:8000/app/users/2
        router.delete('/app/users/:userId', (req, res) => {
            var id = req.params.userId;
            console.log('Delete user with ID ' + id);
            this.Users.deleteUser(res, { userId: id });
        });
        this.expressApp.use('/', router);
    }
}
exports.App = App;
