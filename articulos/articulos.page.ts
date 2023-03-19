import { Component, OnInit } from '@angular/core';
import { ArticulService } from './articul.service';
import { Arti} from './arti'
import { Router } from '@angular/router';
import { Auth} from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  public user; 
  articulos =  [];

 articulo: Arti;

  constructor(private authService: AuthService, private router: Router, private articulService: ArticulService, private auth: Auth ) { }

  ngOnInit() {
    this.user = this.auth.currentUser;

      this.articulService.getarticulos()
      .subscribe(data => { this.articulos = data;})
  }

  getArticulo(num_arti){
    this.articulService.getarticulo(num_arti.value)
    .subscribe(data => { this.articulo = data[0];    
      console.log(this.articulo.marca)
    })
  }


  creararticulo(num_arti){
    const arti = {
      ano: num_arti.value,
      producto:'prueba',
      marca:'prueba',
      cantidad_producto:1,
      valor_producto:1000,
      url_imagen_producto:'https://static.dafiti.com.co/p/adidas-0180-7940271-1-zoom.jpg',
      descripcion_producto:'prueba',
      vendedor:'prueba'
    };
    this.articulService.creararticulo(arti)
     .subscribe();
  }

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}


}
