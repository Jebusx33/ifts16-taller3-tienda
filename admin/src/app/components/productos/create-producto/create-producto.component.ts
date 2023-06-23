import { Component, OnInit, NgModule } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from '../../../guards/admin.guard';
import { CreateClienteComponent } from '../../clientes/create-cliente/create-cliente.component';

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
  // public config : any = {};

  constructor()
   {

  //   this.config = {
  //     height: 500
  //   }
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

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor:'#FF0000',
        color:'red',
        class: 'text-danger',
        position: 'topCenter',
        message:'Los datos ingresados no son validos o faltan datos a completar'
      });
    }
}
}
