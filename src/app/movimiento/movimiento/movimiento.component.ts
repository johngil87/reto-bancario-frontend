import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ValidatorService } from 'src/app/validators/validator.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent {
  
  tituloModal :string = '';
  mensajeModal:string = '';
  displayModal: boolean = false;
  public myForm: FormGroup = this.fb.group({
    idMovimiento:[0, [Validators.required]],
    fecha:['', [Validators.required]],
    tipo:['', [Validators.required]],
    valor:[0,[Validators.required]],
    saldo:[0,[Validators.required]],
    idCuenta:[0,[Validators.required]],
    identificacion:[null],
    contrasena:[null],
    });

  constructor(private fb: FormBuilder,
     private service: MovimientoService,
    private activateRoute: ActivatedRoute, 
    private router: Router){}

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(({id}) =>  this.service.getMovedById(id))
    ).subscribe(res =>{
      if(res){
        this.myForm.setValue(res);
        this.myForm.controls['fecha'].setValue(res.fecha.toString().split('T')[0])
        this.myForm.controls['idCuenta'].disable()
        this.myForm.controls['idMovimiento'].disable()      
        console.log(res)
      }
    });
  }

  actualizarMovimiento(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.controls['idCuenta'].enable()
    this.myForm.controls['idMovimiento'].enable()
    const date : Date =new Date(this.myForm.controls['fecha'].value);
    const newDate :Date = new Date();
    this.myForm.controls['fecha'].setValue(newDate.setDate(date.getDate() +1))
    this.service.updateMoved(this.myForm.value)
    .subscribe(res => {      
      this.messageModal('Exito','Movimiento Actualizado');
      this.router.navigate(['movimientos'])
    },error =>{
      this.messageModal('Error',error.error.message);
    })
  }

  eliminarMovimiento(){
    this.service.deleteMovedById(this.myForm.controls['idMovimiento'].value)
    .subscribe(res =>{ 
      this.router.navigate(['movimientos'])
      this.messageModal('Exito','Movimiento eliminado');
    })
    console.log('eliminar')
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
      }
    }
    return null;
  }

  closePopup(event:boolean){
    this.displayModal=event;
    this.router.navigate(['clientes']);
  }
}
