import { Injectable } from '@angular/core';
import { sample_goals } from 'src/data';
import { GoalModel } from '../share/models/GoalModel';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor() { }

  // Get all the goals from the data.ts
  // Note in the future this will get all the data from the backend
  getAllGoal():GoalModel[]{
    return sample_goals;
  }


}
