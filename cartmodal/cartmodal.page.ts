import { ProductService, Productovancarro, Ventausuario } from '../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Auth, user} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { threadId } from 'worker_threads';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-cartmodal',
  templateUrl: './cartmodal.page.html',
  styleUrls: ['./cartmodal.page.scss'],
})

//En src/global.scss se define el tamaño del Modal

export class CartmodalPage implements OnInit, OnDestroy {
  cart: Productovancarro[] = [];
  total_canti: number;
  total_compra: any;
  total_productos: any;

  nombre_cliente: string = "";
  identificacion: string;
  celular_cliente: string;
  correo_cliente: string;

   //Variable para capturar el usuario de inicio para cuando se envie el correo al cliente
  usuario_sesion: string;

  venta_realizada: number = 0;

  ventausu: Ventausuario[] = [];

  idregistroventa: BehaviorSubject<string>;

  constructor(private emailcomposer: EmailComposer, private inAppBrowser: InAppBrowser, private auth: Auth, private cartService: ProductService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
   //Manejo de localStorage no necesita instalar ningun modulo
    if (localStorage.getItem('nombre_cliente') == "null"){
    
    }else{
      this.nombre_cliente = localStorage.getItem('nombre_cliente')
      this.identificacion = localStorage.getItem('identi_cliente')
      this.celular_cliente = localStorage.getItem('celular_cliente')
      this.correo_cliente = localStorage.getItem('correo_cliente')
    }

    
          this.auth.onAuthStateChanged(user => {     
             this.usuario_sesion = user.email; 
          });
      
  }

  ngOnDestroy(){
    if (this.venta_realizada == 0 && this.nombre_cliente != ""){
    localStorage.setItem('nombre_cliente', this.nombre_cliente);
    localStorage.setItem('identi_cliente', this.identificacion);
    localStorage.setItem('celular_cliente', this.celular_cliente);
    localStorage.setItem('correo_cliente', this.correo_cliente);
    }
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {   
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.precio * j.cantidad, 0);
    
  }

  close() {
    this.modalCtrl.dismiss();
  }


  async checkout() {

    // Perfom PayPal or Stripe checkout process

    let alert = await this.alertCtrl.create({
      header: 'Gracias por su Compra!',
      message: 'Te Entegraremos tu Pedido lo Antes Posible',
      buttons: ['OK']   
    });
    await alert.present().then((ok) => {
      this.modalCtrl.dismiss();

      this.total_compra = this.cart.reduce((i, j) => i + j.precio * j.cantidad, 0);
      this.total_canti = this.cart.reduce((i, j) => i + j.cantidad, 0);
       //window.open("http://ideabien.com?inv_equipo=" + this.total_compra + "&consultorio=NO", '_system', 'location=yes');  
      

      //Codigo para saber el usuario que inicia sesion
      this.auth.onAuthStateChanged(user => {
        console.log('change:', user);
                  //Guardar venta completa realizada por el usuario logueado
              let ventausuario:any={
                fecha_venta: new Date(),
                uid_registraventa:  user.uid,
                email_registraventa: user.email,
                valor: this.total_compra,
                cantidad: this.total_canti
              }
              //Guardar venta completa realizada por el usuario logueado
              this.cartService.addVentausuario(ventausuario);  
             
             //Para saber el Id con el que se esta registrando la venta
              setTimeout(() => {
                this.idregistroventa = this.cartService.getidventa();
                console.log(this.idregistroventa);
               }, 200);            
            

               //Guardar venta detallada por producto por el usuario logueado
              this.cartService.registrarproductocarro(ventausuario.email_registraventa, ventausuario.uid_registraventa, ventausuario.fecha_venta, this.idregistroventa, this.nombre_cliente, this.identificacion, this.celular_cliente, this.correo_cliente);  
              //Limpiar carrito para proxima venta
              this.cartService.cartitemcero();     

              //Para limpiar mis variables de localstorage despues de realizar la venta
              localStorage.clear();
              this.venta_realizada = 1;
        
      });
    
    });
  }


  async openEmail(){
 

     this.total_compra = this.cart.reduce((i, j) => i + j.precio * j.cantidad, 0);
     this.total_canti = this.cart.reduce((i, j) => i + j.cantidad, 0);

     const email: EmailComposerOptions = {     
      to: this.correo_cliente,
      cc: '',
      subject: 'Relacion de Compra de Productos en Wanderjoyas',
      body: 'Compro un total de Productos: ' + this.total_canti + "<br/>Por un Precio de: $" + this.total_compra + "<br/><br/> Fecha de Compra:  " + new Date() + "<br/>Vendido por:  " + this.usuario_sesion + "<br/><br/> Muchas Gracias por Su Compra",     
      //body: '<form style="height: 50px;"><script src="https://checkout.epayco.co/checkout.js" data-epayco-key="7e0a54ca50e10b75445f2d73b968b5d0" class="epayco-button" data-epayco-amount="200000" data-epayco-tax="0.00" data-epayco-tax-ico="0.00" data-epayco-tax-base="200000" data-epayco-name="Pulsera de Oro" data-epayco-description="Pulsera de Oro" data-epayco-currency="cop" data-epayco-country="CO" data-epayco-test="false" data-epayco-external="false" data-epayco-response="http://www.ideabien.com/" data-epayco-confirmation="" data-epayco-button="https://multimedia.epayco.co/dashboard/btns/btn5.png"> </script> </form>',
      isHtml: true
    };
    await this.emailcomposer.open(email);

  }

  pagarcontarjeta(){
    this.total_compra = this.cart.reduce((i, j) => i + j.precio * j.cantidad, 0);
    //Para enlazar los nombres del producto en una sola cadena
    this.total_productos = this.cart.reduce((i: any, j) => i + " -" + j.nombreProducto, "");
    this.inAppBrowser.create("http://ideabien-001-site5.itempurl.com/pagarepayco.aspx?consulta="+ this.correo_cliente + "+&totproductos=" + this.total_productos + "+&valorcompra=" + this.total_compra );
  }
  


}
