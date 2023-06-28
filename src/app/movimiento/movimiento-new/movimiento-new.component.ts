import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { ValidatorService } from 'src/app/validators/validator.service';
import { MovimientoService } from '../services/movimiento.service';
import { CuentaService } from 'src/app/cuenta/services/cuenta.service';

@Component({
  selector: 'app-movimiento-new',
  templateUrl: './movimiento-new.component.html',
  styleUrls: ['./movimiento-new.component.css']
})
export class MovimientoNewComponent {

  tituloModal :string = '';
  mensajeModal:string = '';
  displayModal: boolean = false;
  cuentas : Cuenta[] = [];
  cuenta?: string;
  
  public myForm: FormGroup = this.fb.group({    
    identificacion:[0, [Validators.required, this.validatorService.notCero]],
    idCuenta:['', [Validators.required]],
    valor:[0, [Validators.required, this.validatorService.notCero]],
    contrasena:['',[Validators.required]],
    tipo:['',[Validators.required]]
    });

  constructor(private fb: FormBuilder,
      private service: MovimientoService,
      private cuentaService: CuentaService,
      private validatorService: ValidatorService,
      private router: Router){}

  registrarMovimiento(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      return;
    }
    this.service.createMoved(this.myForm.value).subscribe(res=>{
      this.messageModal('Exito', 'operacion realizada con exito');
      this.router.navigate(['movimientos'])
    },error=>{
      this.messageModal('Error', error.error.message);
    })
    
  }

  buscarCuentas(){
    console.log('buscar')
    const id = this.myForm.controls['identificacion'].value
    this.cuentaService.getAllAcountByClient(id).pipe()
    .subscribe(res =>{
      if(res){
        if(res.length === 0){
          this.messageModal('Error', 'cliente no tiene cuentas registradas'); 
        }
        this.cuentas = res;
        return
      }            
    },error=>{
      this.messageModal('Error', error.error.message);
    });
  }

  messageModal(title : string, message: string){
      this.tituloModal =title;
      this.mensajeModal=message
      this.displayModal=true;
  }

  cancelarMovimiento(){
    this.router.navigate(['movimientos'])
  }
  
  public isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors  && this.myForm.controls[field].touched;   
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field])return null;

    const errors = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'este campo es requerido';

        case 'minLength':
          return 'este campo requiere un minimo de 10 caracteres';

        case 'cero':
          return 'tiene que ser mayor a cero';

        case 'menor':
          return 'el cliente no puede ser menor de edad';
      }
    }
    return null;
  }

  closePopup(event:boolean){
    this.displayModal=event;
  }
}
