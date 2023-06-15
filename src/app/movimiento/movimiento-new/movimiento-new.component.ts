import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancarioService } from 'src/app/services/bancario.service';
import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'app-movimiento-new',
  templateUrl: './movimiento-new.component.html',
  styleUrls: ['./movimiento-new.component.css']
})
export class MovimientoNewComponent {
  public myForm: FormGroup = this.fb.group({
    
    valor:[0, [Validators.required, this.validatorService.notCero]],
    idCuenta:[0,[Validators.required]],
    tipo:['',[Validators.required]]
    });

  constructor(private fb: FormBuilder, private service: BancarioService, private validatorService: ValidatorService){}

  registrarMovimiento(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      console.log("NO VALIDO")
      return;
    }
    this.service.createMoved(this.myForm.value).subscribe(res=>{
      console.log(res)
    })
    
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
