import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from 'src/app/services/goal.service';
import { GoalModel } from 'src/app/share/models/GoalModel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  goals:GoalModel[] = [];

  // need to listen to the route. For listening to the route we need an instance of activated route so lets inject it after the goal service (TBD)
  constructor(private goalService:GoalService, activatedRoute:ActivatedRoute){
    // now our gaols are filled with the data from the goal service that uses the sample goal data from data.ts
    this.goals = goalService.getAllGoal();

    // subscribe means anytime when the params changed called the function inside the subscribe lets pass the function inside the subcrsibe so call it
    // we need to say that if the params have the search terms insidde
    // TODO: Need to set up the appropriate routing path for the Category and Timeline
    activatedRoute.params.subscribe( (params) =>{


        this.goals = goalService.getAllGoal();
    })


  }

  ngOnInit(): void {

  }





}
