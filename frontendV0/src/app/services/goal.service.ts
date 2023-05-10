import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_goals } from 'src/data';
import { GOALS_URL } from '../share/constants/urls';
import { GoalModel } from '../share/models/GoalModel';
import { IGoalModel } from '../share/models/IGoalModel';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  hostUrl:string = 'http://localhost:8080/';

  // Inject http
  constructor(private httpClient: HttpClient) { }

  // Get all the goals from the data.ts
  // Note in the future this will get all the data from the backend
  /*getAllGoal():GoalModel[]{
    return sample_goals;
  }*/
  getAllGoal()
  {
    return this.httpClient.get<IGoalModel[]>( this.hostUrl + '/app/goal');
  }


}
