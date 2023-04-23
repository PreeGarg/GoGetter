// This is the goal model class.
// Note the variable ! means that this variable is required

export class GoalModel{
  goalID!: number;
  studentID!: number;
  title!: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  category!: string;
  progress?: string;
  reminder?: boolean;
}
