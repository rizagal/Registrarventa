import { Injectable } from '@angular/core';
import { Firestore,  collection, query,  where, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, CollectionReference, orderBy} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { NumericValueAccessor } from '@ionic/angular';
import { getFirestore, onSnapshot } from '@firebase/firestore';
import { signInWithCustomToken } from '@angular/fire/auth';
import { groupBy } from 'rxjs/internal/operators/groupBy';


export interface Producto {
  id?: string;
  nombreProducto: string;
  imgUrl:string;
  precio: number;
  descripcion: string;
  categoria: string; 
  stok: number;
}

export interface Productovancarro {
  id?: string;
  nombreProducto: string;
  imgUrl: string;
  precio: number;
  cantidad: number;
}

export interface User {
  uid: string;
  email: string;
}

export interface Ventausuario {
  id?: string;
  fecha_venta: Date;
  uid_registraventa: string;
  email_registraventa: string;
  valor:number;
  cantidad:number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productovacarro: Productovancarro[];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  private idregistroventa = new BehaviorSubject('');

  cartKey = null;

  constructor(private firestore: Firestore) { }


  getProductos(): Observable<Producto[]> {
    const notesRef = collection(this.firestore, 'producto');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Producto[]>;
  }

  getProductoById(id): Observable<Producto> {
    const noteDocRef = doc(this.firestore, `producto/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Producto>;
  }

  addProducto(producto: Producto) {
    const notesRef = collection(this.firestore, 'producto');
    return addDoc(notesRef, producto);
  }

  deleteProducto(producto: Producto) {
    const noteDocRef = doc(this.firestore, `producto/${producto.id}`);
    return deleteDoc(noteDocRef);
  }

  updateProducto(producto: Producto) {
    const noteDocRef = doc(this.firestore, `producto/${producto.id}`);
    return updateDoc(noteDocRef, { nombreProducto: producto.nombreProducto, precio: producto.precio, descripcion: producto.descripcion, categoria: producto.categoria, stok: producto.stok });
  }


  //codigo siguiente para el manejo del carrito--------------------------------------------------------
  addProduct(productovancarro: Productovancarro) {

    let added = false;
    for (let p of this.cart) {
      if (p.id === productovancarro.id) {
        p.cantidad += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      productovancarro.cantidad = 1;
      this.cart.push(productovancarro); 
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }


  getCartItemCount() {
    return this.cartItemCount;
  }

  getProducts() {
    const notesRef = collection(this.firestore, 'producto');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Producto[]>;
  }

  getCart() {
    return this.cart;
  }


  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.cantidad -= 1;
        if (p.cantidad == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.cantidad);
        this.cart.splice(index, 1);
      }
    }
  }

  cartitemcero(){
    this.cartItemCount.next(0);
    this.cart = [];
  }

  registrarproductocarro(email_registraventa, uid_registraventa, fecha_ventaproducto, idregistroventa, nombre_cliente, identificacion, celular_cliente, correo_cliente) {
    for (let p of this.cart) {
      let ventausuariodetallado:any={
        cantidad: p.cantidad,
        categoria:  p.categoria,
        descripcion: p.descripcion,
        id_producto: p.id,
        imgurl: p.imgUrl,
        nombreProducto: p.nombreProducto,
        precio: parseInt(p.precio),
        email_registraventa: email_registraventa,
        uid_registraventa: uid_registraventa,
        fecha_ventaproducto: fecha_ventaproducto, 
        stok: p.stok,
        nombre_cliente: nombre_cliente,
        identificacion: identificacion,
        celular_cliente: celular_cliente,
        correo_cliente: correo_cliente     
      }
      //Guardar cada producto con las variables del arreglo anterior
      const notesRef = collection(this.firestore, 'ventadetallada');
       addDoc(notesRef, ventausuariodetallado); 
       

       //Actualizar stok del producto
       const noteDocRef = doc(this.firestore, `producto/${p.id}`);
      updateDoc(noteDocRef, { stok: p.stok - p.cantidad });


    }   
  }

  addVentausuario(ventausuario: Ventausuario) {
    const notesRef = collection(this.firestore, 'ventas'); 
    addDoc(notesRef, ventausuario);


    //De la siguiente forma se puede consultar en firestore y tambien saber cual es el Id que se ingreso registro
    //video donde se explica https://www.youtube.com/watch?v=gEaY2GZMino
  const db = getFirestore();
    const colref = collection(db, 'ventas');
    const q = query(colref, where("email_registraventa", "==", ventausuario.email_registraventa), where("fecha_venta", "==", ventausuario.fecha_venta));

    onSnapshot(q, (snapshot) => {
       let ventaregistrada = [];
       snapshot.docs.forEach((doc) =>{
           ventaregistrada.push({...doc.data(), id: doc.id});
       })
       //para traer toda la coleccion
       //console.log(ventaregistrada);

       //para traer un campo en especifico
      this.idregistroventa= ventaregistrada[0].id;    
    })
    
  }


  getidventa() {
    return this.idregistroventa;
  }

}
