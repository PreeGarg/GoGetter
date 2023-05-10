import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalServiceService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/model/IGoalModelAngular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  listsObservable: Observable<IGoalModelAngular[]>;



  constructor(list$: GoalServiceService) {
    this.listsObservable = list$.getListsIndex();
  }

  ngOnInit() {
  }

}
