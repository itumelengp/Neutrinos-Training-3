import { HostBinding, Component, OnInit } from '@angular/core';
import { slideInDownAnimation } from '../../animations';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Hero } from '../../classes/hero';
import { HeroService} from '../../services/hero.service';

@Component({
  selector: 'app-herosearch',
  templateUrl: './herosearch.component.html',
  styleUrls: ['./herosearch.component.css'],
  animations:[slideInDownAnimation]
  
})
export class HerosearchComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  heroes$: Observable<Hero[]>;
  //A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //Push a searchTerm into an observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  //Passing a new search term directly to the searchHeroes() after every user keystroke would create an excessive amount of HTTP requests, taxing server resources and burning through the cellular network data plan
  //Instead, the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce the number of calls to the searchHeroes(), ultimately returning an observable of timely hero search results (each a Hero[]).
  ngOnInit() {

    this.heroes$ = this.searchTerms.pipe(
    // wait 300ms after each keystroke before considering the term    
    debounceTime(300),

     // ignore new term if same as previous term
      distinctUntilChanged(),

    // switch to new search observable each time the term changes
    //With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call. Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not return in the order sent.

    //switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call. Results from prior calls are canceled and discarded.

    //Note that canceling a previous searchHeroes() Observable doesn't actually abort a pending HTTP request. Unwanted results are simply discarded before they reach your application code.
    switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
