import { Component } from '@angular/core';
import { CurrentWeatherService } from './services/current-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(private weather : CurrentWeatherService){}

  // se ejecuta cuando el componente esta listo
  ngOnInit(){
    this.weather.get();
  }
}
