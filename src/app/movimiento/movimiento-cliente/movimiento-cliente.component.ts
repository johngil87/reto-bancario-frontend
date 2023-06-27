import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientosCliente } from 'src/app/models/movimientos-cliente';
import { BancarioService } from 'src/app/services/bancario.service';
import { ValidatorService } from 'src/app/validators/validator.service';
import  jsPDF from 'jspdf';
import { ErrorMessage } from '../../models/error';

@Component({
  selector: 'app-movimiento-cliente',
  templateUrl: './movimiento-cliente.component.html',
  styleUrls: ['./movimiento-cliente.component.css']
})
export class MovimientoClienteComponent {
  
  tituloModal :string = '';
  mensajeModal:string = '';
  displayModal: boolean = false;
  movimientos : MovimientosCliente[] = [];  
  public myForm: FormGroup = this.fb.group({
    idCliente:[0, [Validators.required,this.validatorService.notCero]],
    fechaInicial:['', [Validators.required]],
    fechaFinal:['', [Validators.required]]
    });

  constructor(private fb: FormBuilder, private service: BancarioService, private validatorService: ValidatorService){}

  ngOnInit(): void {
    console.log('inicia lista de movimientos')
    
  }

  busquedaMovimientos(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.service.getMovedByClient(this.myForm.controls['idCliente'].value,
    new Date(this.myForm.controls['fechaInicial'].value),
    new Date(this.myForm.controls['fechaFinal'].value)).subscribe(res =>{
      if(res){
        this.movimientos = res;
      }
    },error=>{
      this.tituloModal ='Error'
      this.mensajeModal=error.error.message
      this.displayModal=true;
      this.movimientos = [];
        console.log('error consumo ',error.error.message)
    });
  }

  imprimirTabla(mov: MovimientosCliente){
    const doc = new jsPDF();
    doc.text(this.setFormato(mov),10,10)
    doc.save('movimiento')
  }

  setFormato(mov: MovimientosCliente): string{
    const form = `nombres: ${mov.nombre} \n  
    cuenta: ${mov.numeroCuenta} \n
    estado: ${mov.estado?'activo':'inactivo'} \n
    fecha: ${mov.fecha} \n
    saldo: ${mov.saldo} \n
    saldo inicial: ${mov.saldoInicial} \n
    valor Movimiento: ${mov.valor} \n
    tipo: ${mov.tipo}` ;
   return form;
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
