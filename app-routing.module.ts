import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['folder/Inbox']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'articulos',
    loadChildren: () => import('./articulos/articulos.module').then( m => m.ArticulosPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then( m => m.VentasPageModule),
    ...canActivate(redirectUnauthorizedToLogin)   
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    ...canActivate(redirectUnauthorizedToLogin)   
  },
  {
    path: 'detallearticulo/:id',
    loadChildren: () => import('./detallearticulo/detallearticulo.module').then( m => m.DetallearticuloPageModule),
    ...canActivate(redirectUnauthorizedToLogin)  
  },
  {
    path: 'cartmodal',
    loadChildren: () => import('./cartmodal/cartmodal.module').then( m => m.CartmodalPageModule),
    ...canActivate(redirectUnauthorizedToLogin)  
  },
  {
    path: 'venta',
    loadChildren: () => import('./venta/venta.module').then( m => m.VentaPageModule),
    ...canActivate(redirectUnauthorizedToLogin)  
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
