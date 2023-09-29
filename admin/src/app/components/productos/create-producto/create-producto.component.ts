import { Component, OnInit, NgModule } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from '../../../guards/admin.guard';
import { CreateClienteComponent } from '../../clientes/create-cliente/create-cliente.component';
import { ProductoService } from 'src/app/services/producto.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public producto: any = {
    categoria: '',
    visibilidad: ''
  };
  public file : File | undefined;
  public token;
  public load_btn = false;
  // public config : any = {};

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router:Router)
   {

  //   this.config = {
  //     height: 500
  //   }
  this.token = _adminService.getToken();
   }

  ngOnInit(): void { 
  }

  fileChangeEvent(event:any):void{
    var file :any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      //console.log(file)
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
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);
        
        reader.readAsDataURL(file);

         $('#input-portada').text(file.name);
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
         $('#input-portada').text('Seleccionar imagen');
         this.imgSelect = 'assets/img/01.jpg';
         this.file = undefined;
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
       $('#input-portada').text('Seleccionar imagen');
       this.imgSelect = 'assets/img/01.jpg';
       this.file = undefined;
    }

    console.log(this.file);
  }
  
   

  registro(registroForm : any){
    if(registroForm.valid){

      if(this.file == undefined){
        iziToast.show({
          title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Debe subir una portada para registrar'
        });
      }else{
        console.log(this.producto);
        console.log(this.file);
        this.load_btn = true;
        this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
          response=>{
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position: 'topRight',
                message: 'Se registro correctamente el nuevo producto.'
            });
            this.load_btn = false;

            this._router.navigate(['/panel/productos']);
          },
          error=>{
            console.log(error);
            this.load_btn = false;
          }
        );
      }

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor:'#FF0000',
        color:'red',
        class: 'text-danger',
        position: 'topCenter',
        message:'Los datos ingresados no son validos o faltan datos a completar'
      });
      this.load_btn = false;
    }
}
}
