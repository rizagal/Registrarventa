import { AfterViewInit, Component, ElementRef, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
  //Para animar el fab del carrito
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { CartmodalPage} from '../cartmodal/cartmodal.page';
import { ProductService, Producto } from '../services/product.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit, AfterViewInit {

  productos: Producto[] = [];

  cart = [];
  products = [];

  // Para que sea más fácil obtener el recuento actual de productos, podemos usar un BehaviourSubject como lo hicimos muchas veces antes. ¡Con esta variable, todas las demás páginas pueden simplemente suscribirse a cartItemCount y recibir automáticamente cualquier actualización sin más lógica! Solo debemos asegurarnos de llamar a next() en la variable cada vez que cambiemos el carrito.
  //va aqui, tambien ngoninit  y en el servicio de product.service.ts donde hay una funcion y tambien se crea al principio:   private cartItemCount = new BehaviorSubject(0);
  cartItemCount: BehaviorSubject<number>;

  //Para animar el fab del carrito
  @ViewChild('myfab', { read: ElementRef }) carBtn: ElementRef;
  cartAnimation: Animation;
  //variable para el campo buscar
  term: string = '';

  constructor(private productService: ProductService, private animationCtrl: AnimationController,  private cd: ChangeDetectorRef, private modalCtrl: ModalController) {
    this.productService.getProductos().subscribe(res => {
      this.productos = res;
      this.cd.detectChanges();
    });
   }

  ngOnInit() {
    this.cartItemCount = this.productService.getCartItemCount();
  }


  ngAfterViewInit() {
    //Para animar el fab del carrito
    this.cartAnimation = this.animationCtrl.create('cart-animation');
    this.cartAnimation
    .addElement(this.carBtn.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(1.2)' },
      { offset: 0.8, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' }
    ])
    .duration(300)
    .easing('ease-out');
  }


  addToCart(product) {    
    //Para animar el fab del carrito  
    this.cartAnimation.play();
    
    this.productService.addProduct(product);   
  }
 

  async openCart() {   

    let modal = await this.modalCtrl.create({
      component: CartmodalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
   
    });
    modal.present();
  }

  searchChanged(e): void {
    console.log(this.term);
    this.productService.getProductos().pipe(
      map(users => 
        users.filter(user => user.nombreProducto.toLowerCase().indexOf(this.term)  != -1)
      )
    ).subscribe(
      users => this.productos = users
    )
  }



}
