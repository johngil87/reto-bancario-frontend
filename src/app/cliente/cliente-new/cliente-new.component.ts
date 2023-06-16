import { Component } from '@angular/core';
import { BancarioService } from '../../services/bancario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-new',
  templateUrl: './cliente-new.component.html',
  styleUrls: ['./cliente-new.component.css']
})
export class ClienteNewComponent {

  tituloModal :string = '';
  mensajeModal:string = '';
  displayModal: boolean = false;
  public myForm: FormGroup = this.fb.group({
    nombre:['', [Validators.required]],
    identificacion:['', [Validators.required]],
    direccion:['', [Validators.required]],
    genero:['',[Validators.required]],
    edad:[0,[Validators.required,this.validatorService.notCero, this.validatorService.menorEdad]],
    telefono:['',[Validators.required]],
    contrasena:['',[Validators.required]],
    estado:[false,[Validators.required]]
    });

  constructor(private fb: FormBuilder, private service: BancarioService, private validatorService: ValidatorService,private router: Router){}

  registrarCliente(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      console.log("NO VALIDO")
      return;
    }
    console.log("registro cliente")
    this.service.createCliente(this.myForm.value).subscribe(res=>{
      this.messageModal('', 'operacion exitosa')
      
    },error=>{
      this.messageModal('Error', error.error.message);
    });
  }

  messageModal(title:string, message : string){
    this.tituloModal =title
    this.mensajeModal=message
    this.displayModal=true;
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
    this.router.navigate(['clientes']);
  }
}
