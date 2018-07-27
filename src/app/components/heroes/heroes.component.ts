import { HostBinding, Component, OnInit } from '@angular/core';
import { slideInDownAnimation } from '../../animations';
import { Hero } from '../../classes/hero';
import { HeroService } from '../../services/hero.service'; //import the service
//import { Observable } from 'rxjs';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  animations:[slideInDownAnimation]
  
})
export class HeroesComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  heroes:Hero[];
  // selectedHero:Hero;  //No longer required after moving the herodetail from this view and making it stand alone

  // best practice: use the constructor to do simple initializations like writing parameters to the properties, constructor should not do anything like calling a function which makes http requests
  constructor(private heroService:HeroService) { }  //inject the service into the component, so that an instance will be created and made available when the component is created

  // lifecycle hook that fires after the constructor, best place to call functions when the class has been constructed, to do complex initializations based on method calls
  ngOnInit() {

    // this.heroes=[{id:10,name:'Tumy'},{id:20,name:'Tamara'},{id:30,name:'Teddy'},{id:40,name:'Tamara'}, 
    // {id:50,name:'Mary'},{id:60,name:'Mandy'},{id:70,name:'Mark'},{id:80,name:'Molly'},
    // {id:90,name:'Cassidy'},{id:100,name:'Collins'},
    // ];

    this.getHeroes();
  }

  //function no longer required to set the property as the property is also removed
  // onSelect(hero:Hero): void{
  //   this.selectedHero = hero;  

  //   }

  // a function created to retrieve the values of a service
  getHeroes(): void{
      //this.heroes = this.heroService.getHeroes(); 
      
      //a synchronous call to the getHeroes method of the HeroesService
      // functions that return an observable must be subscribed to, subscribe emits the result into a callback which then assigns the results into the property
      this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  add(name:string): void{
    name = name.trim();
    if(!name){ return; }

    //When addHero saves successfully, the subscribe callback receives the new hero and pushes it into to the heroes list for display.
    this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });

  
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero );
    //If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
    this.heroService.deleteHero(hero).subscribe();
  }

}


interface iHero{
  id:number,
  name:string
}


