import { CategoryEnum } from "./CategoryEnum";
import { ProgressEnum } from "./ProgressEnum";

// This is the goal model class.
// Note the variable ! means that this variable is required

export class GoalModel{
  goalId!: string;
  userId!: string;
  title!: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  category!: CategoryEnum;
  progress?: ProgressEnum;
  reminder?: boolean;
}
