import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';  //httpClient.get() returns an observable, services can return a callback, promise or an observable, which are asynchronous in nature
import { MessageService } from '../services/message.service';

import { Hero } from '../classes/hero';
import { HEROES } from '../classes/mock-heroes';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //dependency injection: making a service available in a class
  constructor(private http: HttpClient, private messageService: MessageService) { }

  //gave the method an asynchronous signatute: returns an observable
  // getHeroes():Observable<Hero[]>{
  //   // Send a message to the message component to inform that data is being fetched
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES); //rxjs of() function
  // }

  //Returns a mock class array
  // getHero(id: number): Observable<Hero>{
  //     //Send the message_after_fetching the hero
  //     this.messageService.add(`HeroService: fetched hero id=${id}`); //back ticks are used to create a template string in which the id can be read
  //     return of(HEROES.find(hero => hero.id ===id));
  // }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET heroes from the mock-server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) //using httpclient to get heroes list i.e. mock-server
    .pipe(  //tap method allows to extend the observable result
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', [])) //rxjs catchError operator
    ); 
  }

  updateHero(hero:Hero): Observable<any> {
    //http put updates to the server
    //he URL is unchanged. The heroes web API knows which hero to update by looking at the hero's id.
    //The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService.
    return this.http.put(this.heroesUrl,hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero %{hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  //AddHero expects the server to generates an id for the new hero, which it returns in the Observable<Hero> to the caller.
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //you don't send data as you did with put and post.
  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //Search heroes names containing search term
  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()) {
      //if no search term is found in list, return an empty hero array
      return of([]);    
    }
    //the url contains a querystring with a search term
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }

  //log a HeroService message with the MessageService
  private log(message: string): void{
      this.messageService.add('HeroService: ' + message)
  }

  //Defining the url with the address of the heroes resource in the server(in-memory-data-service)
  private heroesUrl = 'api/heroes'; //URL to web api



  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

 private handleError<T> (operation = 'operation', result?: T){
  return (error:any): Observable<T> =>{
    //ToDo: Send the error to remote logging infrastructure
    console.error(error); //log error to console

    //TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    //Allow the app to continue by returning an empty result
    return of(result as T);  
  }
 }
}
