import { Component } from '@angular/core';
import { ForecastService } from './services/forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(private forecastService : ForecastService){}

  // se ejecuta cuando el componente esta listo
  ngOnInit(){
    this.forecastService.weather$.subscribe(console.log)
  }
}
