import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { ApiRestService } from '../../../../services/api-rest.service';
import { DatabaseService } from '../../../../services/database.service';

@Component({
  selector: 'app-servicio-resenas',
  templateUrl: './servicio-resenas.page.html',
  styleUrls: ['./servicio-resenas.page.scss'],
})
export class ServicioResenasPage implements OnInit {

  resenas: any[] = [];

  constructor(private router: Router,
    private auth: AuthenticationService, 
    private apiRestService: ApiRestService,
    private dbService: DatabaseService) { }

  
    ngOnInit() {
      this.cargarResenas();  
    }
  
    cargarResenas(){
      this.apiRestService.getResenas().subscribe((data) => {
          this.resenas = data;
          console.log(this.resenas);
        },
        (error) => {
          console.error('Error al obtener las reseñas:', error);
          
        }
      );
    }

    buscarResenaServicio(){}
  
    logout(){
      console.log('Cerrando sesión... ');
      this.auth.logout();
      this.router.navigate(['/login']);
  
    }
}