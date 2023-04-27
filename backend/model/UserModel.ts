import {DataAccess} from '../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { STATUS_CODES } from "http";
import Mongoose = require("mongoose");

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
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
                userId: Number,
                name: String,
                email: String,
                goalList:[
                    {
                        goalId: Number
                    }
                ],
                favoriteView: {
                    type: String,
                    enum: ['Category', 'Timeline']
                },
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }
    
    public retrieveUserDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec((itemArray: any) => {
            response.json(itemArray);
        });
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    // class digram CRUD operation 


}
export {UserModel};