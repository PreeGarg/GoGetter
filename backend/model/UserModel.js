"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const DataAccess_1 = require("../DataAccess");
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
            userId: Number,
            name: String,
            email: String,
            goalList: [
                {
                    goalId: Number
                }
            ],
            favoriteView: {
                type: String,
                enum: ['Category', 'Timeline']
            },
        }, { collection: 'users' });
    }
    createModel() {
        this.model = mongooseConnection.model("User", this.schema);
    }
    retrieveUserDetails(response, filter) {
        var query = this.model.findOne(filter);
        query.exec((itemArray) => {
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
