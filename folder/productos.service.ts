import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {     

  }

  getproductos(){
    this.http.get('http://ideabien-001-site21.itempurl.com/servicioweb.asmx/consulta_turnero')
      
  }

}
