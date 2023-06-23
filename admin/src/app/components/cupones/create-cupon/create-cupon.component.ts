import { Component, OnInit } from '@angular/core';
declare var iziToast;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public cupon :any = {
    tipo: ''
  };
  public load_btn = false;
  constructor () { }

  ngOnInit (): void{

  }
  registro(registroForm){
    if(registroForm.valid){
      console.log(this.cupon);

    }else {
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
