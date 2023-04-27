import {DataAccess} from './../DataAccess';
import {IGoalModel} from '../interfaces/IGoalModel';
import { CategoryEnum } from '../enum/CategoryEnum';
import { ProgressEnum } from '../enum/ProgressEnum';
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
                goalId: {type: String, required: true},
                userId: {type: String, required: true},
                title: {type: String, required: true},
                description: {type: String},
                startDate: {type: Date},
                endDate: {type: Date},
                category: {
                    type: String,
                    enum: [CategoryEnum.School, CategoryEnum.Health, CategoryEnum.Career, CategoryEnum.Relationship,CategoryEnum.Reading, CategoryEnum.Travel],
                    required: true
                },
                progress: {
                    type: String,
                    enum: [ProgressEnum.NotStarted, ProgressEnum.InProgress, ProgressEnum.Completed],
                    default: ProgressEnum.NotStarted
                },
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