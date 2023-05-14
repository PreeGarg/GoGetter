import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  listsObservable: Observable<IGoalModelAngular[]>;

  goals: IGoalModelAngular[] = [];


  constructor(private goalService$: GoalService, activatedRoute: ActivatedRoute) {
    // This is for getting all of the goals
    this.listsObservable = goalService$.getAllGoals();

   this.listsObservable.subscribe((result) => {
      this.goals = result;
    })






    // This is for testing to call the temporary data.ts file to see if html is the issue. But it is not.
    //this.goals = goalService$.getAll();
    //console.log("It is listening to get the getListsIndex");


  }





  ngOnInit() {
    //this.getDataFromAPI();
  }

}
