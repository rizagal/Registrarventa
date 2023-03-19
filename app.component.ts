import { Component,  AfterViewInit} from '@angular/core';
import { Auth} from '@angular/fire/auth';
import { User } from '../app/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit{
  currentUser: User = null;

  public appPages = [   
    //{ title: 'Ventas', url: '/ventas', icon: 'pricetag' },  
    { title: 'Menu', url: '/menu', icon: 'apps' },  
    { title: 'Carrito de Ventas', url: '/venta', icon: 'cart' },  
    //{ title: 'Articulos BDideabien', url: '/articulos', icon: 'cloud-download' },
  ];

  constructor(private auth: Auth) {   

    //Codigo para saber el usuario que inicia sesion
   this.auth.onAuthStateChanged(user => {
    console.log('change:', user);
    this.currentUser = user;    
        if (this.currentUser == null  || this.currentUser == undefined) {
          this.appPages = [   
          ];
        }else{
          this.appPages = [   
            //{ title: 'Ventas', url: '/ventas', icon: 'pricetag' },  
                        { title: 'Menu', url: '/menu', icon: 'apps' },  
                        { title: 'Carrito de Ventas', url: '/venta', icon: 'cart' },  

                        ];
        }
   });

  }

  ngAfterViewInit() {   
  
  }
}
