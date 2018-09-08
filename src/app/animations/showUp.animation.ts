import { trigger, state, transition, style, animate } from '@angular/animations';

// la transicion es como va suceder el cambio entre los estados q se presentan
// la transicion enter es cuando el componente pasa del estado void (no forma parte de la vista ) a estado in
// lo que està declaro en state es el valor final
// lo q esta declarado en transition en como va partir la animacion, cuando pasa de void a in. Luego lo q esta en el state in es como termina la animacion
// si se usaria scale redimensiona el ancho y el alto por tanto el efecto es q aparece desde el centro y vva aumentado ancho y largo
export const showUp = trigger('showUpElement',[
  state('in',style({ opacity: 1, transform: 'scaleY(1)' })),
  transition(':enter',[
    style({opacity: 0, transform: 'scaleY(0)'}),
    animate(250)
  ])
]);
