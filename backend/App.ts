import * as express from 'express';
import * as bodyParser from 'body-parser';
import {GoalModel} from './model/GoalModel';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Goals:GoalModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Goals = new GoalModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.

  
  private routes(): void {

    let router = express.Router();
    //http://localhost:8080/app/goal
    router.get('/app/goal/', (req, res) => {
      console.log('Query all goals');
      this.Goals.retrieveAllGoals(res);
  });

    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};