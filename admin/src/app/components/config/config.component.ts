import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { v4 as uuidv4 } from 'uuid';
declare var iziToast:any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit{ 
  public token;
  public config : any = {};
  public url;

  public titulo_cat = '';
  public icono_cat = '';
  public file : any = null;
  public imgSelect : any | ArrayBuffer;

  private random(){
    return Math.floor((Math.random() * 100000000) + 1);
  }

  constructor(
    private _adminService: AdminService
    ){
      this.token = localStorage.getItem('token');
      this.url = GLOBAL.url;
      console.log(uuidv4());
      console.log(this.config);
      console.log(this.url);
      console.log(this.token);
      this._adminService.obtener_config_admin(this.token).subscribe(
        response=>{
          this.config = response.data;
          this.imgSelect = this.url + 'obtener_logo/' + this.config.logo;
          console.log(this.config);
          console.log(response.data);
        },
        error=>{
          console.log(error);
          console.log(this.config);
          console.log(this.url);
          console.log(this.token);
        }
      );
    }

    agregar_cat(){
      if(this.titulo_cat && this.icono_cat){
        console.log(uuidv4());
        console.log(this.config);
        console.log(this.token);
        console.log(this.url);
        
          this.config.categorias.push({
            titulo: this.titulo_cat,
            icono: this.icono_cat,
            _id: uuidv4()
          });

          this.titulo_cat = '';
          this.icono_cat = '';
      }else{
        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Debe ingresar un titulo e icono para la categoria'
        });
      }
  }

  
  ngOnInit(): void {
  }

    actualizar(confForm:any){
      if(confForm.valid){
        let data ={
          titulo: confForm.value.titulo,
          serie: confForm.value.serie,
          correlativo: confForm.value.correlativo,
          categorias: this.config.categorias,
          logo: this.file 
        }
        this._adminService.actualiza_config_admin('64ea50d5a61984d7fb807294', data, this.token).subscribe(
          response=>{
            iziToast.show({
              title: 'SUCCES',
              titleColor: '#1DC74C',
              color: 'green',
              class: 'text-success',
              position: 'topCenter',
              message: 'Se actualizo correctamente la configuracion'
            });
          })
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: 'red',
          class: 'text-danger',
          position: 'topCenter',
          message: 'Complete correctamente el formulario'
        });
      }
    }

    fileChangeEvent(event:any){
      var file : any = undefined;
      if(event.target.files && event.target.files[0]){
        file = <File>event.target.files[0];
      }else{
        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'No hay un imagen de envio'
        });
      }
      //Valida tamaño del file y tipo
      if(file.size <= 4000000){
        if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
         
          const reader = new FileReader();
          reader.onload = e => this.file= reader.result;
          $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
          $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
          reader.readAsDataURL(file);
          this.file = file;
  
        }else{
          iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'El archivo debe ser una imagen'
          });
        }
      }else{
        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'La imagen no puede superar los 4MB'
        });
      }

    }

    ngDoCheck(): void{
      $('cs-drop-preview').html('<img src="this.file">')
    }
    
    eliminar_categoria(idx: any){
      this.config.categorias.splice(idx,1);
    }
}