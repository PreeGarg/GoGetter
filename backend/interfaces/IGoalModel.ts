import Mongoose = require("mongoose");

interface IGoalModel extends Mongoose.Document {
    goalId: number;
    title: string;
    description: string;
    studentId: number;
    startDate: Date;
    endDate: Date;
    category: string;
    progress: string;
    reminder: boolean;
}
export {IGoalModel};