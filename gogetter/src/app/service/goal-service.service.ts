import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGoalModelAngular } from '../model/IGoalModelAngular';
import { sample_goals } from 'src/data';

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class GoalServiceService {

  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getListsIndex() {
    return this.httpClient.get< IGoalModelAngular[]>( this.hostUrl + 'app/goal');

  }

}
