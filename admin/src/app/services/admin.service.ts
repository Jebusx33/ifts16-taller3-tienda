import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  //login
  login_admin(data: { email: any; password: any; }): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type', 'application/json'
    );
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }

  //token
  getToken() {
    return localStorage.getItem('token');
  }

  obtener_config_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_config_publico',{headers:headers});
  }

  //guards
  public isAuthenticated(allowRoles: String[]): boolean {
    const token = localStorage.getItem('token');

    //si tiene token
    if (!token) {
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      //si el token es valido
      if (!decodedToken) {
        console.log("No es valido");
        localStorage.removeItem('token'); //remueve el token
        return false;
      }
    } catch (error) {
      console.log(error)
      localStorage.removeItem('token'); //remueve el token
      return false;
    }
    return allowRoles.includes(decodedToken['role']);
  }
}
