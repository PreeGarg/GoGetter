import {DataAccess} from './../DataAccess';
import {IGoalModel} from '../interfaces/IGoalModel';
import { STATUS_CODES } from "http";
import Mongoose = require("mongoose");

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class GoalModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                goalId: Number,
                title: String,
                description: String,
                studentId: Number,
                startDate: Date,
                endDate: Date,
                category: String,
                progress: String,
                reminder: Boolean,
            }, {collection: 'goals'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IGoalModel>("Goal", this.schema);
    }
    
    public retrieveGoalsDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec((itemArray: any) => {
            response.json(itemArray);
        });
    }

    public retrieveAllGoals(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

}
export {GoalModel};