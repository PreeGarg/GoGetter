import {DataAccess} from '../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { FavoriteEnum } from '../enum/FavoriteEnum';
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
                userId: {type: String, required: true},
                name: {type: String, required: true},
                email: {type: String, required: true},
                goalList:[
                    {
                        goalId: String  // TODO: is it better to change this to {type:[GoalModel.schema] ?? }
                    }
                ],
                favoriteView: {
                    type: String,
                    enum: [FavoriteEnum.Category, FavoriteEnum.Timeline],
                    default: FavoriteEnum.Category
                },
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }
    
    public retrieveUserDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray: any) => {
            response.json(itemArray);
        });
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray: any) => {
            response.json(itemArray) ;
        });
    }

    public async checkUserExists(filter: Object): Promise<boolean> {
        const userFound = await this.model.findOne(filter);
        return userFound !== null;
    }

}
export {UserModel};