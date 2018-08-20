import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from '../../structures/weather.structure';
import { environment } from '../../environments/environment';
import { Coords } from '../../structures/coords.structure';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubject : Subject<any> = new Subject<any>();
  public weather$ : Observable<any>;
  endpoint : string = 'http://api.openweathermap.org/data/2.5/forecast';

  constructor(private http : HttpClient) {
    // obtener la version observable del sujeto
    this.weather$ = this.weatherSubject.asObservable();

    this.get({
      lat: 35,
      lon: 139
    });
  }

  get(coords : Coords){
    let args : string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url = this.endpoint + args
    if(isDevMode()){
      url = 'assets/forecast.json'
    }
    this.http.get(url).subscribe(this.weatherSubject);
  }
}
