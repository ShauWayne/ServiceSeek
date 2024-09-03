import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Importa ModalController
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../register-modal/register-modal.component'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router:Router) { }


  ngOnInit() {
  }

  async openRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
    });
    return await modal.present();
  }

  irAHome(){
    this.router.navigate(['/home']);
  }
}
