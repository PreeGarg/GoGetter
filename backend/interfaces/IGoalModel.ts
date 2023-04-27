import {CategoryEnum} from '../enum/CategoryEnum'
import {ProgressEnum} from '../enum/ProgressEnum'

import Mongoose = require("mongoose");

interface IGoalModel extends Mongoose.Document {
    goalId: number;
    title: string;
    description: string;
    userId: number;
    startDate: Date;
    endDate: Date;
    category: CategoryEnum;
    progress: ProgressEnum;
    reminder: boolean;
}
export {IGoalModel};