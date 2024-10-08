import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: '404', 
    loadChildren: () =>import ('./not-found/not-found.module').then( m => m.NotFoundPageModule)  },

  {
    path: 'buscar-servicio',
    loadChildren: () => import('./menu/buscar-servicios/buscar-servicios.module').then( m => m.BuscarServiciosPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./menu/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./menu/ubicaciones-guardadas/ubicaciones-guardadas.module').then( m => m.UbicacionesGuardadasPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./menu/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'terminos-y-condiciones',
    loadChildren: () => import('./menu/terminos-y-condiciones/terminos-y-condiciones.module').then( m => m.TerminosYCondicionesPageModule)
  },
  {
    path: 'add-resena',
    loadChildren: () => import('./menu/crud/resena/add-resena/add-resena.module').then( m => m.AddResenaPageModule)
  },
  {
    path: 'del-resena',
    loadChildren: () => import('./menu/crud/resena/del-resena/del-resena.module').then( m => m.DelResenaPageModule)
  },
  {
    path: 'upd-resena',
    loadChildren: () => import('./menu/crud/resena/upd-resena/upd-resena.module').then( m => m.UpdResenaPageModule)
  },
  {
    path: 'servicio-resenas/:id',
    loadChildren: () => import('./menu/crud/servicios/servicio-resenas/servicio-resenas.module').then( m => m.ServicioResenasPageModule)
  },
  //{ path: '**', redirectTo: '404' },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
