import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { AnimationController } from '@ionic/angular';
import type { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isModalOpen = false;
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor(private modalCtrl: ModalController, private animationCtrl: AnimationController, private router: Router) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout(){
    console.log('Cerrando sesión... ');
      this.router.navigate(['/login']);

  }

  ngOnInit() {
    this.openModal();
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

    this.modal.enterAnimation = enterAnimation;
    this.modal.leaveAnimation = leaveAnimation;
  }



}
