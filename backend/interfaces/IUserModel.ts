import {FavoriteEnum} from '../enum/FavoriteEnum'
import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: number;
    name: string;
    email: string;
    goalList: [
        {
            goalId: number
        }
    ];
    favoriteView: FavoriteEnum
}
export {IUserModel};

