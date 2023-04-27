import { GoalModel } from "./app/share/models/GoalModel";
import { CategoryEnum } from "./app/share/models/CategoryEnum";


export const sample_goals: GoalModel[] = [
  {
    goalId: 1,
    userId: 202020,
    title: "Need to get a 90% on AI midterm",
    description: "Start studying for the exam 10 days before the test",
    category: CategoryEnum.School,
    progress: "Not Started",
    reminder: false,
  },
  {
    goalId: 2,
    userId: 202020,
    title: "Need to get a 90% on SAAS midterm",
    description: "Start studying for the exam 10 days before the test",
    category: CategoryEnum.School,
    progress: "Not Started",
    reminder: false,
  },
  {
    goalId: 3,
    userId: 202020,
    title: "Need to eat 1 apple per day",
    description: "Eat an apple in the morning",
    category: CategoryEnum.Health,
    progress: "Not Started",
    reminder: false,
  },
  {
    goalId: 4,
    userId: 202020,
    title: "Need to go to the gym 3 times per week",
    description: "Go to they gym on Sunday, Wednesday, and Friday",
    category: CategoryEnum.Health,
    progress: "Not Started",
    reminder: false,
  },

]
