import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from '../services/current-weather.service';
import { showUp } from '../animations/showUp.animation';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  animations: [showUp]
})
export class CurrentWeatherComponent implements OnInit {

  // se hace public para ser accedido desde el template
  constructor(public weatherService : CurrentWeatherService) { }

  ngOnInit() {
    // this.weatherService.get();
    // el servicio tiene un propiedad weather$ que es un observable q recibe los mismos datos q se reciben la peticion http del servicio (del observable q return http.get)
    // lo q se logra es q ahora existe un propiedad en el componente al cual se puede suscribir, que este en una propidad va servir para trabajar con el template
    // this.weatherService.weather$.subscribe(console.log)
  }

}
