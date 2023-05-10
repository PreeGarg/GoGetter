import { CategoryEnum } from "../enum/CategoryEnum";
import { ProgressEnum } from "../enum/ProgressEnum";


interface IGoalModelAngular {
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
export {IGoalModelAngular};
