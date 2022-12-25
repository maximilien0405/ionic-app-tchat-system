import { trigger, transition, style, animate } from "@angular/animations";

export const fadeAnimation = trigger('fadeAnimation', [
  transition(
    ':enter',
    [
      style({ opacity: 0 }),
      animate('0.2s ease-out',
        style({ opacity: 1 }))
    ]
  ),
  transition(
    ':leave',
    [
      style({ opacity: 1 }),
      animate('0.2s ease-in',
        style({ opacity: 0 }))
    ]
  )
]
);

export const slideRightAnimation = trigger('slideRightAnimation', [
  transition(
    ':enter',
    [
      style({ transform: 'translateX(100%)' }),
      animate('0.2s ease-out',
        style({ transform: 'translateX(0%)' }))
    ]
  ),
  transition(
    ':leave',
    [
      style({ transform: 'translateX(0%)' }),
      animate('0.2s ease-out',
        style({ transform: 'translateX(100%)' }))
    ]
  )
]
);

export const slideUpAnimation = trigger('slideUpAnimation', [
  transition(
    ':enter',
    [
      style({ transform: 'translateY(100%)' }),
      animate('0.2s ease-out',
        style({ transform: 'translateY(0%)' }))
    ]
  ),
  transition(
    ':leave',
    [
      style({ transform: 'translateY(0%)' }),
      animate('0.2s ease-out',
        style({ transform: 'translateY(100%)' }))
    ]
  )
]
);
