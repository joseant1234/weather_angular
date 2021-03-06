import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from '../../structures/weather.structure';

// cuando este en prod, angular de forma automatica utilizará en environment.prod
import { environment } from '../../environments/environment';
import { Coords } from '../../structures/coords.structure';

import { GeolocationService } from './geolocation.service';

// en angular 6 los servicios ya no se declaran en app.module, sino en el mismo servicio
@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject : Subject<any> = new Subject<any>();
  // por lo general se pone signo dolar $ a los observables para distinguir q es un stream de datos al q se puede suscribir
  // observable weather va ser el sujeto weatherSubject, pero actuando como un observable
  // public weather$ : Observable<any> = this.weatherSubject.asObservable();

  public weather$ : Observable<any>;

  endpoint : string = 'http://api.openweathermap.org/data/2.5/weather';

  // inyectar el servicio HttpClient usando el inyector de dependencia
  // si se especifica un argumento para el servicio que se esta realizando que coincida con alguno que tiene registrado el inyector de dependencia, como es el caso de HttpClient lo va asignar ese objeto
  constructor(private http : HttpClient, private geolocationService : GeolocationService) {
    // el uso del operador pipe es para pasar como argumento las operaciones
    // lo q hace es q cuando halla nuevos datos en el observable, se van a pasar por la funcion map, map lo va recibir como argumento de la funcion q se le pasa
    // lo q return map van a sustituir los datos q map recibió
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map((data : any)=>{
        // como las propiedades q estan dentro de mainWeather son las mismmas q se van a poner en el objeto weather del tipo Weather(weather.structure) se puede usar destructur objects, va agarrar la prop colocadass y las va combinar con las del objeto mainWeather
        let mainWeather = data.weather[0];
        let weather : Weather = {
          name: data.name,
          cod: data.cod,
           temp: data.main.temp,
          ...mainWeather
        };
        return weather;
      })
    );

    // se llama get, pues se esta trabajando con el flujo Subject, q se va llamar en el componente
    // this.weatherService
    // this.get({
    //   lat: 35,
    //   lon: 139
    // });
    this.geolocationService.coords$.subscribe((coords)=>{
      this.get(coords);
    });
  }

  get(coords : Coords){
    // this.http.get return un observable sirve para manejar data u operaciones asincronas
    // para recibr la informacion que viene del observable se debe suscribir a el
    // es como un canal de youtube, no se conoce cuando la operacion this.http.get va terminar, es por ello que se suscribe para recibr la nueva informacion que se envia
    // this.http.get('assets/weather.json').subscribe(console.log)

    // le decimos al sujeto q sea el quien se suscriba a los datos q provengan del resultado de la peticion htttp
    // el sujeto esta haciendo la tarea de un observer, pues esta suscribiendose a un observable para recibir la informacion
    // let observable = this.http.get('assets/weather.json').subscribe(this.weatherSubject);

    // un beneficio de usar un Sujeto, es q ahora se puede proveer la informacion del clima no solo usando una peticion http, sino tambien por ejemplo:
    // con esto lo q se logra es q las fuentes de informacion del sujeto pueden ser muchas, pero siempre las va a proveer a traves de su version observable
    // de donde venga la informacion se la puede pasar al sujeto y el la va ser llegar a los suscritos a su version observable
    // setTimeout(()=>{
    //   this.weatherSubject.next({});
    // })

    let args : string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url = this.endpoint + args
    // if(isDevMode()){
    //   url = 'assets/weather.json'
    // }
    this.http.get(url).subscribe(this.weatherSubject);

  }
}
