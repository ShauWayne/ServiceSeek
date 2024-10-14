import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map = null;

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement | null = document.getElementById('map');
    if (mapEle) { // Verifica si no es null
      const myLatLng = { lat: -33.45694, lng: -70.64827 };
      this.map = new google.maps.Map(mapEle, { 
        center: myLatLng,
        zoom: 12,
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    } else {
      console.error('El elemento con ID "map" no se encontró en el DOM.');
    }
  }
}  

