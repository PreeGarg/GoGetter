"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalModel = void 0;
const DataAccess_1 = require("./../DataAccess");
const Mongoose = require("mongoose");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class GoalModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            goalId: Number,
            title: String,
            description: String,
            userId: Number,
            startDate: Date,
            endDate: Date,
            category: {
                type: String,
                enum: ['School', 'Health', 'Career', 'Relationship', 'Reading', 'Travel']
            },
            progress: String,
            reminder: Boolean,
        }, { collection: 'goals' });
    }
    createModel() {
        this.model = mongooseConnection.model("Goal", this.schema);
    }
    retrieveGoalsDetails(response, filter) {
        var query = this.model.findOne(filter);
        query.exec((itemArray) => {
            response.json(itemArray);
        });
    }
    retrieveAllGoals(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
}
exports.GoalModel = GoalModel;
