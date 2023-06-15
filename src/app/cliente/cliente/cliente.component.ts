import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancarioService } from 'src/app/services/bancario.service';
import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  public myForm: FormGroup = this.fb.group({
    nombre:['', [Validators.required,Validators.minLength(10)]],
    identificacion:['', [Validators.required,this.validatorService.onlyNumbers]],
    direccion:['', [Validators.required]],
    genero:['',[Validators.required]],
    edad:[0,[Validators.required,this.validatorService.notCero]],
    telefono:['',[Validators.required,this.validatorService.onlyNumbers]],
    contrasena:['',[Validators.required, Validators.minLength(10)]],
    estado:[false,[Validators.required]]
    });

  constructor(private fb: FormBuilder, private service: BancarioService, private validatorService: ValidatorService){}

}
