import { Injectable } from '@angular/core';
import { Coords } from '../../structures/coords.structure';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  // al utilizar observables se puede utilizar el pipe async en la vista para obtener de manera rapida su valor, tambien se puede aplicar a las promesas
  public coords$ : Promise<Coords>;

  constructor() { }

  // metodo q se manda a llamar desde los componentes, cuando ellos requieran obtner la ubicacion
  // al llamar requestGeolocation se va asignar la promesa resultado de llamar a getGeolocation a la promesa coords$ (prop del servicio)
  requestGeolocation(){
    // al utilizar this.coords$ = this.getGeolocation();
    // los servicios son singleton, solo se crea una vez, solo se crea un objeto por cada servicio y este objeto se comparte por todos los componentes o servicios que necesiten el servicio
    // eso permite q las propiedades q se hallan asignado o q modifiquen el valor se comparten igual entre componentes
    // si el componente A utiliza la prop coords$ y el componente B utiliza tambien la prop coords$, solo se requiere q uno de estos componentes modifique la prop coords$, es decir, mande a llamar el metodo requestGeolocation() para q en todos los componentes se vea el cambio reflejado
    this.coords$ = this.getGeolocation();
    // no hace return this.getGeolocation(), porque sino por cada componente que requiera la geolocation tiene llamar requestGeolocation q tambien calcularia de nuevo la geolocacion con el metodo getLocation()
  }

  getGeolocation() : Promise<Coords>{
    // se pasa una funcion al constructor de la clase Promise, esta funcion recibe 2 argumentos: funcion de resolucion y otra funcion de rechazo, la primera se ejecuta cuando la promesa se cumple bien, y rej se ejecuta cuando salio algo mal en la promesa
    return new Promise((res,rej)=>{
      // si no hay navigator, por ejemplo en un ambiento como angular universal con nodejs
      // o q el metodo 'geolocation' no este en el objeto navigator (navegador obsoleto)
      // con return ya no se ejecuta la otra parte del bloque
      if(!navigator || !('geolocation' in navigator)) return rej('Geolocation is not available');

      // para solucionar problemas con ts q muestra error
      (navigator as any).geolocation.getCurrentPosition((position)=>{
        res({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      });
    });
  }

}
