import { Component } from '@angular/core';
import { ForecastService } from './services/forecast.service';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(private geolocationService : GeolocationService){}

  // // se ejecuta cuando el componente esta listo
  // ngOnInit(){
  //   this.forecastService.weather$.subscribe(console.log)
  // }

  ngOnInit(){}
}
