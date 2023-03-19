import { Component, OnInit } from '@angular/core';
import { ProductService, Producto } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  productos: Producto[] = [];
  public user; 

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  categories = {
    slidesPerView: 2.5,
  };


  constructor(private authService: AuthService, private auth: Auth, private router: Router, private firestoreService: ProductService) {
    this.firestoreService.getProductos().subscribe(res => {
      this.productos = res;      
    });
    
   }

  ngOnInit() {
    this.user = this.auth.currentUser;
  }

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

}
