import { Component } from '@angular/core';
import { CurrentWeatherService } from './services/current-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(private weatherService : CurrentWeatherService){}

  // se ejecuta cuando el componente esta listo
  ngOnInit(){
    // this.weatherService.get();

    // el servicio tiene un propiedad weather$ que es un observable q recibe los mismos datos q se reciben la peticion http del servicio (del observable q return http.get)
    // lo q se logra es q ahora existe un propiedad en el componente al cual se puede suscribir, que este en una propidad va servir para trabajar con el template
    this.weatherService.weather$.subscribe(console.log)
  }
}
