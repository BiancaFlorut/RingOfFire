import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-c27b5","appId":"1:113762257478:web:3cb56e8039e209f43cd847","storageBucket":"ring-of-fire-c27b5.appspot.com","apiKey":"AIzaSyALCNqrR8hfztCQxD3HJxBohEKkjHlHEs0","authDomain":"ring-of-fire-c27b5.firebaseapp.com","messagingSenderId":"113762257478"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
