import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HerodetailsComponent } from './components/herodetails/herodetails.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { MessagesComponent } from './components/messages/messages.component';


import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http'; //Angulars mechanism for communicating with the remote server over HTTP
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HerosearchComponent } from './components/herosearch/herosearch.component' ;


// const appRoutes:Routes = [
//   {path:'', component:DashboardComponent},
//   {path:'heroes', component:HeroesComponent}
// ]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HerodetailsComponent,
    MessagesComponent,
    HerosearchComponent
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // RouterModule.forRoot(appRoutes),
    
    HttpClientModule,   
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation:false}),
    AppRoutingModule, 
    

    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent] //the main application view, only the root module has this
})
export class AppModule { }
