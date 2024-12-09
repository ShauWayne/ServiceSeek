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
    loadChildren: () => import('./menu/buscar-servicios/buscar-servicios.module').then( m => m.BuscarServiciosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mapa',
    loadChildren : () => import('./menu/mapa/mapa.module').then( m => m.MapaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./menu/ubicaciones-guardadas/ubicaciones-guardadas.module').then( m => m.UbicacionesGuardadasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./menu/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'terminos-y-condiciones',
    loadChildren: () => import('./menu/terminos-y-condiciones/terminos-y-condiciones.module').then( m => m.TerminosYCondicionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-resena/:id',
    loadChildren: () => import('./menu/crud/resena/add-resena/add-resena.module').then( m => m.AddResenaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'del-resena',
    loadChildren: () => import('./menu/crud/resena/del-resena/del-resena.module').then( m => m.DelResenaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'upd-resena/:id',
    loadChildren: () => import('./menu/crud/resena/upd-resena/upd-resena.module').then( m => m.UpdResenaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'servicio-resenas/:id',
    loadChildren: () => import('./menu/crud/servicios/servicio-resenas/servicio-resenas.module').then( m => m.ServicioResenasPageModule),
    canActivate: [AuthGuard]
  },  
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  { path: '**', redirectTo: '404' },


  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
