import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para redirigir si es necesario
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { AuthenticationService } from 'src/app/auth/authentication.service';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, OnDestroy{
  
  map = null;

  constructor(private router: Router, private loadingController: LoadingController, private auth: AuthenticationService) { } // Inyectar el router en el constructor
  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
      this.map = null;
    }
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    this.map = null;
    const loading = await this.loadingController.create({//Ventana de carga
      message: 'Cargando...',
    });
    await loading.present();//Muestra carga en pantalla

    const ubiActual = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };
    };

    const myLatLng = await ubiActual();

    setTimeout(() => {
      console.log('Intentando cargar el mapa...');
      const mapEle: HTMLElement | null = document.getElementById('map');
      if (mapEle) {
        this.map = new google.maps.Map(mapEle, {center: myLatLng, zoom: 16});
        console.log('Mapa cargado correctamente');
      } else {
        console.error('El elemento con ID "map" no se encontró en el DOM.');
      }
      new google.maps.Marker({position: myLatLng, map: this.map, title:'Ubicación actual'});

      loading.dismiss();
    },500);       
  }

  recargar(){
    window.location.reload();
  }
  

  // Implementación del método logout
  logout() {
    console.log('Cerrar sesión');
    this.auth.logout();
    
  }
}