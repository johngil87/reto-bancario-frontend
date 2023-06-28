import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cuenta } from 'src/app/models/cuenta';
import { Movimiento } from 'src/app/models/movimiento';
import { ValidatorService } from 'src/app/validators/validator.service';
import { CuentaService } from '../services/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {

  cuenta? : Cuenta;
  tituloModal :string = '';
  mensajeModal:string = '';
  displayModal: boolean = false;
  movimientos : Movimiento[] = [];
  back :string = 'cuentas'
  public myForm: FormGroup = this.fb.group({
    tipoCuenta:['', [Validators.required]],
    saldoInicial:[0, [Validators.required]],
    saldoDisponible:[0, [Validators.required]],
    estado:[false,[Validators.required]]
    });

  constructor(private fb: FormBuilder,
     private service: CuentaService, 
    private validatorService: ValidatorService, 
    private activateRoute: ActivatedRoute, 
    private router: Router){}

  ngOnInit(): void {

    this.activateRoute.params.pipe(
      switchMap(({id}) =>  this.service.getAcountById(id))
    ).subscribe(res =>{
      if(res){
        this.cuenta = res;
        this.setInput(this.cuenta);
      }
    });
  }

  actualizarCuenta(){
    console.log("actualizando cuenta")
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      return;
    }
    this.service.updateAcount(this.setCuenta()).subscribe(res=>{
      this.messageModal('', 'operacion exitosa');
    },error=>{
      this.messageModal('Error', error.error.message);
    });
  }

  eliminarCuenta(){
    console.log("eliminar cuenta")
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      return;
    }
    this.service.deleteAcount(this.cuenta?.numeroCuenta!).subscribe(()=>{
      this.messageModal('', 'operacion exitosa');
    },error=>{
      this.messageModal('Error', error.error.message);
    })
  }

  messageModal(title:string, message : string){
    this.tituloModal =title
    this.mensajeModal=message
    this.displayModal=true;
  }

  setInput(cuenta: Cuenta){
    this.movimientos = cuenta.movimientos;
    this.myForm.controls['tipoCuenta'].setValue(cuenta.tipoCuenta);
    this.myForm.controls['saldoInicial'].setValue(cuenta.saldoInicial);
    this.myForm.controls['saldoDisponible'].setValue(cuenta.saldoDisponible);
    this.myForm.controls['estado'].setValue(cuenta.estado);
  }

  setCuenta(): Cuenta{
    return {
      numeroCuenta: this.cuenta?.numeroCuenta,
      movimientos: this.cuenta?.movimientos!,
      tipoCuenta:  this.myForm.controls['tipoCuenta'].value,
      saldoDisponible:this.myForm.controls['saldoDisponible'].value,
      saldoInicial: this.myForm.controls['saldoInicial'].value,
      estado: this.myForm.controls['estado'].value,
      cliente: this.cuenta?.cliente!,    
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

        case 'minlength':
          return 'este campo requiere un minimo de 10 caracteres';

        case 'cero':
          return 'tiene que ser mayor a cero';

        case 'menor':
          return 'el cliente no puede ser menor de edad';

          case 'max':
            return 'edad no puede ser superior a 100';
      }
    }
    return null;
  }

  closePopup(event:boolean){
    this.displayModal=event;
    this.router.navigate(['cuentas']);
  }

}
