import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  //listar clientes 
  listar_clientes_filtro_admin(tipo: any, filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get(this.url + 'listar_clientes_filtro_admin/' + tipo + '/' + filtro, { headers: headers });
  }

  // regsitrar cliente registro_cliente_admin
  registro_cliente_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.post(this.url + 'registro_cliente_admin', data, { headers: headers });
  }


  //obtener cliente obtener_cliente_admin
  obtener_cliente_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`
    });
    return this._http.get(this.url + 'obtener_cliente_admin/' + id, { headers: headers });
  }

  // actualizar cliente registro_cliente_admin
  actualizar_cliente_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.put(this.url + 'actualizar_cliente_admin/' + id, data, { headers: headers });
  }
  // eliminar cliente registro_cliente_admin
  eliminar_cliente_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.delete(this.url + 'eliminar_cliente_admin/' + id, { headers: headers });
  }
}
