import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; //Importing the RouterModule and Routes symbols from @angular/router library

import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HerodetailsComponent } from './components/herodetails/herodetails.component';

const routes:Routes = [
  { path:'', redirectTo:'/dashboard', pathMatch:'full'}, //empty path is for the default page, redirect route
  { path:'dashboard', component:DashboardComponent},  //simple route
  //parameterized route
  { path: 'details/:id', component:HerodetailsComponent}, //: colon before the id indicates that id is a placeholder for a specific hero id
  { path:'heroes', component:HeroesComponent}  //simple route
  
]

@NgModule({
  imports: [
    // called forRoot because it configures the router at the application root level
    // forRooot() method supplies the directives and service providers required for routing and performs the navigation based on the current browser URL
    RouterModule.forRoot(routes) //initializing the router and start it listening for borowser location changes
    // CommonModule    
  ],
  exports:[RouterModule]  //making the RouteModule directives available in the AppModule components that will need them
  // declarations: [] //generally components are not declared in a module
})
export class AppRoutingModule { }
