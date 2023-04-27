import {CategoryEnum} from '../enum/CategoryEnum'
import {ProgressEnum} from '../enum/ProgressEnum'

import Mongoose = require("mongoose");

interface IGoalModel extends Mongoose.Document {
    goalId: string;
    title: string;
    description: string;
    userId: string;  // TODO: consider changing data type to Mongoose.Types.ObjectId as foreign key
    startDate: Date;
    endDate: Date;
    category: CategoryEnum;
    progress: ProgressEnum;
    reminder: boolean;
}
export {IGoalModel};