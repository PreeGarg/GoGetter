import {CategoryEnum} from '../enum/CategoryEnum'
import Mongoose = require("mongoose");

interface IGoalModel extends Mongoose.Document {
    goalId: number;
    title: string;
    description: string;
    userId: number;
    startDate: Date;
    endDate: Date;
    category: CategoryEnum;
    progress: string;
    reminder: boolean;
}
export {IGoalModel};