import { HostBinding, Component, OnInit, Input } from '@angular/core'; //input symbol to allow an input decorator to be added on to the componenent
import { slideInDownAnimation } from '../../animations';
import { Hero } from '../../classes/hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-herodetails',
  templateUrl: './herodetails.component.html',
  styleUrls: ['./herodetails.component.css'],
  animations:[slideInDownAnimation]
})


export class HerodetailsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
  @Input()hero: Hero; //@input: input decorator to enable the property to be updated in a parent component

  constructor(private route:ActivatedRoute, //ActivatedRoute hold the route to this instance of the Herodetails.component, the component is interested in the parameters extracted from the url, the id parameter is the id of the hero to display
              private heroService:HeroService, //HeroService gets the list of heroes from the "server, the component will use the list to get the hero to display"
              private location:Location ) { } //Location is the angular service to interact with the browser, will be used to navigate back to the view that navigated to the component

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    //snapshot is the static image of the route information shortly after the component was created
    //paramMap is a dictionary of the route parameter values extracted from the url, the id key returns the id of the hero to fetch
    //Route parameters are always strings. The Javascript (+) operator converts the string to a number which is what the id should be
    const id = + this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero=>this.hero=hero);
  }

  goBack(): void{
    this.location.back();  //use the location service to navigate back one stack to the view that called the component view
  }

  //method persists hero name changes using the hero service updateHero() method and then navigates back to the previous view.
  save(): void{
    this.heroService.updateHero(this.hero)
    .subscribe(()=> this.goBack());
  }

}
