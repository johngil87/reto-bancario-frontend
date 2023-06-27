import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancarioService } from 'src/app/services/bancario.service';
import { ValidatorService } from 'src/app/validators/validator.service';
import { Cliente } from '../../models/cliente';
import { Cuenta } from 'src/app/models/cuenta';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-new',
  templateUrl: './cuenta-new.component.html',
  styleUrls: ['./cuenta-new.component.css']
})
export class CuentaNewComponent {

  cliente?:Cliente;
  cuenta?: Cuenta;
  tituloModal :string = '';
  mensajeModal:string = '';
  displayModal: boolean = false;
  public myForm: FormGroup = this.fb.group({
    numeroCuenta:[0, [Validators.required, this.validatorService.notCero,Validators.max(9999999999),Validators.min(60000)]],
    identificacion:[0, [Validators.required, this.validatorService.notCero,Validators.max(9999999999),Validators.min(999999)]],
    saldoInicial:[0,[Validators.required]],
    tipoCuenta:['',[Validators.required]],
    estadoCuenta:[false,[Validators.required]]
    });

  constructor(private fb: FormBuilder, 
    private service: BancarioService, 
    private validatorService: ValidatorService,
    private router: Router){}

  registrarCuenta(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      console.log("NO VALIDO")
      return;
    }
    this.service.getClientByIdentification(this.myForm.controls['identificacion'].value)
    .pipe(
      switchMap((res)=>{
        if(res){
          this.cliente = res;
        }          
       return this.service.createAcount(this.setCuenta(this.cliente!))
      },error=>{
        this.messageModal('Error', 'no existe cliente con ese id');
      })     
    ).subscribe(()=> {
      this.messageModal('', 'operacion exitosa');
      this.router.navigate(['cuentas']);
    },
      error=>{
      this.messageModal('Error', error.error.message);
    })
  }

  messageModal(title:string, message : string){
    this.tituloModal =title
    this.mensajeModal=message
    this.displayModal=true;
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
      numeroCuenta: this.myForm.controls['numeroCuenta'].value,
      tipoCuenta: this.myForm.controls['tipoCuenta'].value,
      saldoInicial: this.myForm.controls['saldoInicial'].value,
      estado: this.myForm.controls['estadoCuenta'].value,
      movimientos: [],
      saldoDisponible: null
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

        case 'min':          
          return 'este campo debe tener mas de 5 numeros';
        
          case 'max':
          return 'este campo debe tener maximo de 10 numeros';
      }
    }
    return null;
  }

  closePopup(event:boolean){
    this.displayModal=event;
  }
}
