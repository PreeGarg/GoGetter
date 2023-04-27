"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    checkUserExists(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.model.findOne(filter);
            return userFound !== null;
        });
    }
}
exports.UserModel = UserModel;
