import { trigger, style, animate, query, stagger, transition } from '@angular/animations';

// la animacion consite en una animacion de entrada y entre cada uno de la entrada de los elementos, hay un pequeño delay
export const loadingAnimation = function(){
  return trigger('loading',[
    transition('* => *',[
      query(':leave', [
        stagger(100, [
          animate('350ms',style({opacity: 0}))
        ])
      ],{optional: true}),
      query(':enter',[
        style({opacity: 0}),
        stagger(100,[
          animate('350ms',style({opacity: 1}))
        ])
      ],{optional: true})
    ])
  ]);
}
