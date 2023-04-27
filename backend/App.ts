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

    // Create one goal for one user - TODO

    // Retrieve one goal for one user - TODO

    // Retrieve all goals for one user - TODO


    // Retrieve all goals for all users - NOT VALID METHOD, TO REMOVE
    // http://localhost:8080/app/all-goals (Postman Test URL)
    router.get('/app/all-goals/', (req, res) => {
      console.log('Query all goals');
      this.Goals.retrieveAllGoals(res);
    });


    // Update one goal for one user - TODO

    // Delete one goal for one user - TODO


  
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