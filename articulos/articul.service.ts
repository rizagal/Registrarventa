import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Arti} from './arti'


@Injectable({
  providedIn: 'root'
})
export class ArticulService {

  constructor(private http: HttpClient) { }
   

  getarticulos(){
    return this.http.get<any>('http://ideabien-001-site21.itempurl.com/servicioweb.asmx/consulta_articulo');      
  }


  getarticulo(id: string){
    return this.http.get<Arti>('http://ideabien-001-site21.itempurl.com/servicioweb.asmx/consulta_articulo_uno?id='+id);   
  }


  creararticulo(arti: Arti){  
   return this.http.get('http://ideabien-001-site21.itempurl.com/servicioweb.asmx/crear_articulo?ano='+arti.ano+'&producto='+arti.producto+'&marca='+arti.marca+'&cantidad_producto='+arti.cantidad_producto+'&valor_producto='+arti.valor_producto+'&url_imagen_producto='+arti.url_imagen_producto+'&descripcion_producto='+arti.descripcion_producto+'&vendedor='+arti.vendedor);  
  }

}
