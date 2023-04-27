"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const DataAccess_1 = require("../DataAccess");
const FavoriteEnum_1 = require("../enum/FavoriteEnum");
const Mongoose = require("mongoose");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class UserModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userId: { type: String, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            goalList: [
                {
                    goalId: String // TODO: is it better to change this to {type:[GoalModel.schema] ?? }
                }
            ],
            favoriteView: {
                type: String,
                enum: [FavoriteEnum_1.FavoriteEnum.Category, FavoriteEnum_1.FavoriteEnum.Timeline],
                default: FavoriteEnum_1.FavoriteEnum.Category
            },
        }, { collection: 'users' });
    }
    createModel() {
        this.model = mongooseConnection.model("User", this.schema);
    }
    retrieveUserDetails(response, filter) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    retrieveAllUsers(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
}
exports.UserModel = UserModel;
