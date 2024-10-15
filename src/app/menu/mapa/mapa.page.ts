import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para redirigir si es necesario
declare var google: any;

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, OnDestroy{
  
  map = null;

  constructor(private router: Router) { } // Inyectar el router en el constructor
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    console.log('Intentando cargar el mapa...');
    const mapEle: HTMLElement | null = document.getElementById('map');
    if (mapEle) {
      const myLatLng = { lat: -33.45694, lng: -70.64827 };
      this.map = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 12,
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        console.log('Mapa cargado correctamente');
      });
    } else {
      console.error('El elemento con ID "map" no se encontró en el DOM.');
    }
  }
  

  addMarker(marker: Marker) {
    const markerObj = new google.maps.Marker({
      position: marker.position,
      title: marker.title,
      map: this.map,
    });
  }

  // Implementación del método logout
  logout() {
    console.log('Cerrar sesión');
    // Aquí podrías agregar la lógica para eliminar datos de sesión o tokens
    // Redirigir al usuario a la página de inicio de sesión, por ejemplo:
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión o donde prefieras
  }
}
