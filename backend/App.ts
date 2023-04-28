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

    // Create a goal
    http://localhost:8080/app/goal
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
      this.Goals.retrieveGoalsbyProperties(res, {category: _category});
  });

  //Retrieve all goals by progress
  router.get('/app/goals/progress/:progress', (req, res) => {
    var _progress = req.params.progress;
    console.log('Category: ' + _progress);
    this.Goals.retrieveGoalsbyProperties(res, {progress: _progress});
});


    // Retrieve one goal by goalId
   // http://localhost:8080/app/goals/1
    router.get('/app/goals/:goalId', (req, res) => {
      var id = req.params.goalId;
      console.log('GoalId: ' + id);
      this.Goals.retrieveGoalsDetails(res, {goalId: id});
  });

    // Update one goal for one user
    router.put('/app/goals/:goalId', (req, res) => {
      const id = req.params.goalId;
      const goalUpdate = req.body;
      const filter = {goalId: id };
    
      // Call the createOrUpdateGoal() method from your Mongoose class to update or create the goal
      this.Goals.createOrUpdateGoal(res, filter, goalUpdate);
    });

    // Delete one goal for one user
    router.delete('/app/goals/:goalId', (req, res) => {
      var id = req.params.goalId;
      console.log('GoalId to be deleted: ' + id);
      this.Goals.deleteGoal(res, {goalId: id})
    });

    //--------------------------------------------USER CRUD--------------------------------------

    // Create one user
    // http://localhost:8080/app/user with user info written as JSON in input payload
    router.post('/app/user', async (req: any, res: any) => {
      console.log('Create one user');
      const newUserInfo = req.body;
      
      try {
        // Check if the user email already exists in the database -- TO CONFIRM IF IT'S OKAY TO USE EMAIL TO CHECK
        const existingEmail = await this.Users.checkUserExists({email: newUserInfo.email})

        if (existingEmail) {
          return res.status(409).send('User email already exists');
        }

        // If the user email does not exist, create a new user
        const newUser = new this.Users.model({ ...newUserInfo, userId: this.generateUUIDNumber() });
        await newUser.save();

        return res.status(201).send('New user account created');
      } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
    });


    // Retrieve information about one user  -- THIS IS BASED ON THE ASSUMPTION THAT ID IS IN THE PAYLOAD
    // http://localhost:8080/app/user
    router.get('/app/user', async (req: any, res: any) => {
      console.log('Query one user');
      const newUserInfo = req.body;
      const userIdObj = {userId: newUserInfo.userId}

      try {
        // Check if the userId exists 
        const idExists = await this.Users.checkUserExists(userIdObj)
        if (!idExists) {
          return res.status(404).send('User not found');
        }

        // If user is found, return the user's details 
        this.Users.retrieveUserDetails(res, userIdObj);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
    });
    

    // Retrieve information about all users -  ADMINISTRATOR USE THIS FUNCTION? DO WE WANT ADMINISTRATOR ROLE? 
    // http://localhost:8080/app/all-users
    router.get('/app/all-users/', (req: any, res: any) => {
      console.log('Query all users');
      this.Users.retrieveAllUsers(res);
    });

    // Update information about one user - TODO

    // Delete all information from one user - TODO



    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
    this.expressApp.use('/images', express.static(__dirname + '/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));

  }
}

export { App };