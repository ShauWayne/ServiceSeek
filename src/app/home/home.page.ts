import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { AnimationController } from '@ionic/angular';
import type { IonModal } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  navigationValue: any; // Variable para almacenar el valor del usuario
  isModalOpen = false; // Boolean para abrir modal
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthenticationService
  ) {
    this.activeRoute.queryParams.subscribe(params => { //Suscribe parámetros de la ruta activa
      const navigation = this.router.getCurrentNavigation(); // Obtiene la navegación actual
      if (navigation?.extras.state) { // Si hay datos extra...
        this.navigationValue = navigation.extras.state['user']; // ... Los guarda en la variable
        console.log(this.navigationValue);
      }
    });
  }

  ngOnInit() {
    this.openModal();
    this.askForLocation();
    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;

      if (!root) {
        return this.animationCtrl.create();
      }

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    if (this.modal) {
      this.modal.enterAnimation = enterAnimation;
      this.modal.leaveAnimation = leaveAnimation;
    }
  }

  async askForLocation() {
    try {
      if (Capacitor.isNativePlatform()) {
        // Solicitar permisos de ubicación en dispositivo móvil
        const hasPermission = await Geolocation.requestPermissions();
        if (hasPermission.location === 'granted') {
          // Obtener la ubicación del usuario
          const position = await Geolocation.getCurrentPosition();
          console.log('Ubicación actual:', position);
        } else {
          console.error('Permiso de ubicación denegado');
          alert('La aplicación necesita acceso a la ubicación para funcionar correctamente.');
        }
      } else {
        // Usar la API de geolocalización del navegador en la web
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Ubicación actual (web):', position);
            },
            (error) => {
              console.error('Error al obtener la ubicación en la web:', error);
              alert('La aplicación necesita acceso a la ubicación para funcionar correctamente.');
            }
          );
        } else {
          console.error('La geolocalización no está soportada en este navegador.');
        }
      }
    } catch (error) {
      console.error('Error al solicitar la ubicación:', error);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}