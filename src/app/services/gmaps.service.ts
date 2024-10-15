import { Injectable } from '@angular/core';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {
  private mapsApiIsLoad:boolean=false;

  constructor() { }

  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if(this.mapsApiIsLoad) {
        resolve();
        return;
      } 
        
    const script = document.createElement('script');
    script.src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDCEc30W1iJ1XhzrJxfX4ximgysO-ltpv';
    script.async=true;
    script.defer=true;
    script.onload = () => {
      this.mapsApiIsLoad=true;
      resolve();
    };
    script.onerror = (error) => {
      reject('Error cargando API de Google Maps: ${error}');
    };

    document.head.appendChild(script);
    });
  }
  
}