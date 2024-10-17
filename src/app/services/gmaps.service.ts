// Importaciones necesarias desde Angular y jQuery
import { Injectable } from '@angular/core';
import { error } from 'jquery';

// Definición del decorador Injectable para hacer que el servicio pueda ser inyectado
@Injectable({
  providedIn: 'root' // Define el ámbito del servicio como 'root', lo que hace que esté disponible en toda la aplicación
})
export class GmapsService {
  // Variable privada para verificar si la API de Google Maps ya se ha cargado
  private mapsApiIsLoad: boolean = false;

  // Constructor de la clase
  constructor() { }

  // Método para cargar la API de Google Maps
  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Si la API ya está cargada, resolvemos la promesa inmediatamente
      if (this.mapsApiIsLoad) {
        resolve();
        return;
      } 

      // Creación de un nuevo elemento <script> para agregar la API de Google Maps
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDCEc30W1iJ1XhzrJxfX4ximgysO-ltpv'; // URL de la API de Google Maps con la clave de acceso
      script.async = true; // Carga el script de forma asíncrona
      script.defer = true; // Retrasa la ejecución del script hasta que la página se haya analizado completamente
      script.onload = () => {
        // Una vez cargado el script, se marca como cargado y se resuelve la promesa
        this.mapsApiIsLoad = true;
        resolve();
      };
      script.onerror = (error) => {
        // Si ocurre un error al cargar el script, se rechaza la promesa con un mensaje de error
        reject(`Error cargando API de Google Maps: ${error}`);
      };

      // Agrega el script a la cabecera del documento para comenzar la carga
      document.head.appendChild(script);
    });
  }
}
