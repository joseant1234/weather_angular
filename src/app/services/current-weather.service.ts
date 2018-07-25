import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// en angular 6 los servicios ya no se declaran en app.module, sino en el mismo servicio
@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  // inyectar el servicio HttpClient usando el inyector de dependencia
  // si se especifica un argumento para el servicio que se esta realizando que coincida con alguno que tiene registrado el inyector de dependencia, como es el caso de HttpClient lo va asignar ese objeto
  constructor(private http : HttpClient) { }

  get(){
    // this.http.get return un observable sirve para manejar data u operaciones asincronas
    // para recibr la informacion que viene del observable se debe suscribir a el
    // es como un canal de youtube, no se conoce cuando la operacion this.http.get va terminar, es por ello que se suscribe para recibr la nueva informacion que se envia
    this.http.get('assets/weather.json').subscribe(console.log)
  }
}
