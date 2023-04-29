import * as express from 'express';
import * as bodyParser from 'body-parser';
import { GoalModel } from './model/GoalModel';
import { UserModel } from './model/UserModel';

// import crypto module from Node.js to create Hash
const crypto = require('crypto');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Goals: GoalModel;
  public Users: UserModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Goals = new GoalModel();
    this.Users = new UserModel();
  }

  generateUUIDNumber(): String {
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
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {

    let router = express.Router();

    //--------------------------------------------GOAL CRUD--------------------------------------

    // Create a goal
    // http://localhost:8080/app/goal
    router.post('/app/goal', async (req: any, res: any) => {
      console.log('Create one goal');
      const newGoalInfo = req.body;

      try {
        const newGoal = new this.Goals.model({ ...newGoalInfo, goalId: this.generateUUIDNumber() });
        await newGoal.save();
        return res.status(201).send('New goal created');
      }
      catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
    });

    // Retrieve all goals
    // http://localhost:8080/app/goals (Postman Test URL)
    router.get('/app/goals/', (req, res) => {
      console.log('Query all goals');
      this.Goals.retrieveAllGoals(res);
    });

    //Retrieve all goals by category
    router.get('/app/goals/category/:category', (req, res) => {
      var _category = req.params.category;
      console.log('Category: ' + _category);
      this.Goals.retrieveGoalsbyProperties(res, { category: _category });
    });

    //Retrieve all goals by progress
    router.get('/app/goals/progress/:progress', (req, res) => {
      var _progress = req.params.progress;
      console.log('Category: ' + _progress);
      this.Goals.retrieveGoalsbyProperties(res, { progress: _progress });
    });


    // Retrieve one goal by goalId
    // http://localhost:8080/app/goals/1
    router.get('/app/goals/:goalId', (req, res) => {
      var id = req.params.goalId;
      console.log('GoalId: ' + id);
      this.Goals.retrieveGoalsDetails(res, { goalId: id });
    });

    // Update one goal for one user
    router.put('/app/goals/:goalId', (req, res) => {
      const id = req.params.goalId;
      const goalUpdate = req.body;
      const filter = { goalId: id };

      // Call the createOrUpdateGoal() method from your Mongoose class to update or create the goal
      this.Goals.createOrUpdateGoal(res, filter, goalUpdate);
    });

    // Delete one goal for one user
    router.delete('/app/goals/:goalId', (req, res) => {
      var id = req.params.goalId;
      console.log('GoalId to be deleted: ' + id);
      this.Goals.deleteGoal(res, { goalId: id })
    });

    //--------------------------------------------USER CRUD--------------------------------------

    // Create a user
    // http://localhost:8080/app/user (user info as JSON in input payload)
    router.post('/app/user/', (req, res) => {
      var newUserInfo = req.body;
      var newUserEmail = newUserInfo.email   // email will be used to check for existing user
      newUserInfo.userId = crypto.randomBytes(16).toString("hex");  // generate random ID to assign to new user 
      console.log('Add new user to database');
      this.Users.createNewUser(res, newUserInfo, {email: newUserEmail});
    });

    // Retrieve all users
    // http://localhost:8080/app/users
    router.get('/app/users/', (req: any, res: any) => {
      console.log('Query all users');
      this.Users.retrieveAllUsers(res);
    });

    // Retrieve one user by userId
    // http://localhost:8080/app/users/1
    router.get('/app/users/:userId', (req: any, res: any) => {
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
      this.Users.updateUserDetails(res, userUpdate, {userId: id})
    });

    // Delete one user
    // http://localhost:8000/app/users/2
    router.delete('/app/users/:userId', (req, res) => {
      var id = req.params.userId;
      console.log('Delete user with ID ' + id);
      this.Users.deleteUser(res, { userId: id })
    });


    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
    this.expressApp.use('/images', express.static(__dirname + '/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));

  }
}

export { App };