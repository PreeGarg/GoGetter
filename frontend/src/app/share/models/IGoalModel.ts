import { CategoryEnum } from "./CategoryEnum";
import { ProgressEnum } from "./ProgressEnum";

interface IGoalModel {
    goalId: string;
    title: string;
    description: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    category: CategoryEnum;
    progress: ProgressEnum;
    reminder: boolean;
}
export {IGoalModel};
