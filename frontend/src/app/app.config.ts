
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig = [
  provideRouter(routes),
  importProvidersFrom(FormsModule),
  provideHttpClient()

];
