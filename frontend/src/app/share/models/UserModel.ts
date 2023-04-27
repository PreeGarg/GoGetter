import { FavoriteEnum } from "./FavoriteEnum";

// This is the user model class.
// Note the variable ! means that this variable is required

export class UserModel{
  userId!: number;
  name!: string;
  email!: string;
  goalList?: [
    {
        goalId: number
    }];
    favoriteView?: FavoriteEnum
}
