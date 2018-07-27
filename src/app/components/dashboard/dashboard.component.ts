import { HostBinding, Component, OnInit } from '@angular/core';
import { slideInDownAnimation } from '../../animations';
import { Hero } from '../../classes/hero';
import { HeroService } from '../../services/hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations:[slideInDownAnimation]
})
export class DashboardComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  heroes:Hero[] = [];
  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes.slice(1,5));
  }

}
