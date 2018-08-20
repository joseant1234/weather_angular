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
    this.weather$ = this.weatherSubject.asObservable().pipe(map(this.structureData));

    this.get({
      lat: 35,
      lon: 139
    });
  }

  structureData(data : any){

    // la clave sera mes - dia, se usa el mes pues si solo se usaría dia al pasar del 31 a 4,.. hubiese un problema para poder ver el mayor valor
    let minMaxPerDay = {};

    data.list.forEach(weatherObject => {
      // para convertir una timestamp en una fecha que se pueda leer se multiplca por 1000 milisegundos
      let date = new Date(weatherObject.dt * 1000)
      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();
      let key = `${month}-${day}`;

      // si ya tiene un valor en el objeto minMaxPerDay q use ese, sino q recien lo inicialice con {} (en caso de ser el primer valor del día)
      let tempPerDay : Weather = minMaxPerDay[key] || {
        minMaxTemp : {}
      };

      // el temp_min y temp_max de la prop main son valores que definen el rango de error para la temperatura
      // al iniciarse el objeto tempPerDay, esta vacio por tanto si no tiene valores se le asigna la temp_min, o si tiene valor y la temp_min es menor a la temp_min hasta el momento, se le asigna temp_min
      if(!tempPerDay.minMaxTemp.min || (weatherObject.main.temp_min < tempPerDay.minMaxTemp.min)){
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }
      
      if(!tempPerDay.minMaxTemp.max || (weatherObject.main.temp_max > tempPerDay.minMaxTemp.max)){
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;
    });

    return minMaxPerDay;
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
