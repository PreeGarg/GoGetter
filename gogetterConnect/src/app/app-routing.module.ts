import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './components/home/home/home.component';
import { NavComponent } from './components/home/navbar/nav.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReadComponent } from './components/crudpage/read/read.component';
import { CreateComponent } from './components/crudpage/create/create.component';
import { MessagesComponent } from './components/crudpage/messages/messages.component';


const routes: Routes = [
  // adding the route to home
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home/nav', component: NavComponent },
  { path: 'read', component: ReadComponent },
  { path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
