import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';


const routes: Routes = [
    // need to add the route to show the home component by default. passed it as an empty string to show it as the home page, and set the component to the home componet
    {path:'', component:HomeComponent},
    // TODO: Setting the category to be the default of the home page. Need to finish the path
    {path:'category/', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
