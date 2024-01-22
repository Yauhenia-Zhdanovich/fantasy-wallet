import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ETHEREUM, ethereumFactory } from '../ethereum/ethereum.const';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: ETHEREUM, useFactory: ethereumFactory },
    provideAnimations(),
  ],
};
