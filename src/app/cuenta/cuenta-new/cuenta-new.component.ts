import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancarioService } from 'src/app/services/bancario.service';
import { ValidatorService } from 'src/app/validators/validator.service';
import { Cliente } from '../../models/cliente';
import { Cuenta } from 'src/app/models/cuenta';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cuenta-new',
  templateUrl: './cuenta-new.component.html',
  styleUrls: ['./cuenta-new.component.css']
})
export class CuentaNewComponent {

  cliente?:Cliente;
  cuenta?: Cuenta;
  public myForm: FormGroup = this.fb.group({
    
    identificacion:[0, [Validators.required]],
    saldoInicial:[0,[Validators.required]],
    tipoCuenta:['',[Validators.required]],
    estadoCuenta:[false,[Validators.required]]
    });

  constructor(private fb: FormBuilder, private service: BancarioService, private validatorService: ValidatorService){}

  registrarCuenta(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      console.log("NO VALIDO")
      return;
    }
    this.service.getClientById(this.myForm.controls['identificacion'].value)
    .pipe(
      switchMap((res)=>{
        if(res){
          this.cliente = res;
        }          
       return this.service.createAcount(this.setCuenta(this.cliente!))
      })
      
    ).subscribe()
  }

  setCuenta(res:Cliente):Cuenta{
    return {
      cliente:{
        identificacion: res.identificacion,
        direccion: res.direccion,
        nombre: res.nombre,
        genero: res.genero,
        edad: res.edad,
        telefono: res.telefono,
        contrasena:res.contrasena,
        estado:res.estado,
        idCliente:res.idCliente
      },
      tipoCuenta: this.myForm.controls['tipoCuenta'].value,
      saldoInicial: this.myForm.controls['saldoInicial'].value,
      estado: this.myForm.controls['estadoCuenta'].value,
      movimientos: []
    }
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
}
