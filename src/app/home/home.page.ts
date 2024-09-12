import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isModalOpen = false;

  constructor(private modalCtrl: ModalController) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.openModal();
  }

}
