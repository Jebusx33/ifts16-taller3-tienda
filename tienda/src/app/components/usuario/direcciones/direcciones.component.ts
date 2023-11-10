import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public token;
  public direccion : any = {
    pais: '',
    localidad: '',
    provincia: '',
    principal: false
  };

  public direcciones :Array<any> = [];

  public localidades:Array<any> = [];
  public provincias:Array<any> = [];

  public localidades_arr:Array<any> = [];
  public provincias_arr:Array<any> = [];

  public load_data = true;

  constructor(
    private _guestService:GuestService,
    private _clienteService:ClienteService
  ) {
    this.token = localStorage.getItem('token');

    this._guestService.get_Localidades().subscribe(
      response=>{
        console.log("Response de localidades: ",response)
        this.localidades_arr = response.localidades;
      }
    );

    this._guestService.get_Provincias().subscribe(
      response=>{
        console.log("Response de provincias: ",response)
        this.provincias_arr = response.provincias;
      }
    );
   }

  ngOnInit(): void {
    this.obtener_direccion();
  }

  obtener_direccion(){
    this._clienteService.obtener_direccion_todos_cliente(localStorage.getItem('_id'),this.token).subscribe(
      response=>{
        this.direcciones = response.data;
        this.load_data = false;
      }
    );
  }

  select_pais(){
    this.provincias = []
    this.localidades = []
    if(this.direccion.pais == 'Argentina'){
      $('#sl-provincia').prop('disabled', false);
      this._guestService.get_Provincias().subscribe(
        response=>{
          console.log("Response provincias: ");
          console.table(response.provincias)
          response.provincias.forEach((element: any) => {
            this.provincias.push({
                 name: element.nombre,
                 id: element.id
                
            });
          });

        }
      );

    }else{
      $('#sl-localidad').prop('disabled', true);
      $('#sl-provincia').prop('disabled', true);
      this.localidades = [];
      this.provincias = [];

      this.direccion.localidad = '';
      this.direccion.provincia = '';
    }
  }

  select_localidad(){
    $('#sl-provincia').prop('disabled', false);
  }

  capitalize(str: string) {
    let words = str.split(' ');
    let capitalizedWords: any[] = [];
    words.forEach((word: string | any[]) => {
        capitalizedWords.push(word[0].toUpperCase() + word.slice(1).toString().toLowerCase());
    });
    return capitalizedWords.join(' ');
}
  
  select_provincia(){
    this.localidades = [];
    $('#sl-localidad').prop('disabled', false);
    this.direccion.localidad = '';
    this._guestService.get_Localidades().subscribe(
      response=>{
        console.log("Response localidades en select_provincia: ", response);
        console.log("Consultando provincia en localidad: ", this.direccion);
        response.localidades.forEach((localidad:any ) => {
          if(localidad.provincia.id == this.direccion.provincia){
            this.localidades.push(
             {
              ...localidad,
              name: this.capitalize(localidad.nombre),
              id: localidad.id
             }
            );
          }
      });
    });
  }


  registrar(registroForm: any){
    if(registroForm.valid){
      console.log("Iterando this.localidades_arr: ", this.localidades_arr)
      this.localidades_arr.forEach((element: { id: string; name: any; }) => {
        if(parseInt(element.id) == parseInt(this.direccion.localidad)){
          this.direccion.localidad = element.name;
        }
      });

      this.provincias_arr.forEach(element => {
        if(parseInt(element.id) == parseInt(this.direccion.provincia)){
          this.direccion.provincia = element.name;
        }
      });

      let data = {
        destinatario: this.direccion.destinatario,
        dni: this.direccion.dni,
        postal: this.direccion.postal,
        direccion: this.direccion.direccion,
        telefono: this.direccion.telefono,
        pais: this.direccion.pais,
        localidad: this.direccion.localidad,
        provincia: this.direccion.provincia,
        principal: this.direccion.principal,
        cliente: localStorage.getItem('_id')
      }

      this._clienteService.registro_direccion_cliente(data,this.token).subscribe(
        response=>{
          this.direccion = {
            pais: '',
            localidad: '',
            provincia: '',
            principal: false
          };
          $('#sl-localidad').prop('disabled', true);
          $('#sl-provincia').prop('disabled', true);
          this.obtener_direccion();
          iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se agregó la nueva direccion correctamente.'
          });
        }
      );

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
    });
    }
  }

  establecer_principal(id: any){
    this._clienteService.cambiar_direccion_principal_cliente(id,localStorage.getItem('_id'),this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Se actualizó la direccion principal.'
      });
        this.obtener_direccion();
      }
    );
  }

}
