import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { BancarioService } from 'src/app/services/bancario.service';
import { ValidatorService } from 'src/app/validators/validator.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{

  cliente? : Cliente;
  tituloModal :string = '';
  mensajeModal:string = '';
  displayModal: boolean = false;
  public myForm: FormGroup = this.fb.group({
    nombre:['', [Validators.required]],
    identificacion:['', [Validators.required]],
    direccion:['', [Validators.required]],
    genero:['',[Validators.required]],
    edad:[0,[Validators.required,this.validatorService.notCero, this.validatorService.menorEdad, Validators.max(100)]],
    telefono:['',[Validators.required]],
    contrasena:['',[Validators.required, Validators.minLength(5)]],
    estado:[false,[Validators.required]],
    idCliente:[0,[Validators.required]],
    });

  constructor(private fb: FormBuilder,
     private service: BancarioService, 
    private validatorService: ValidatorService, 
    private activateRoute: ActivatedRoute, 
    private router: Router){}

  ngOnInit(): void {

    this.activateRoute.params.pipe(
      switchMap(({id}) =>  this.service.getClientById(id))
    ).subscribe(res =>{
      if(res){
        this.cliente = res;
        this.myForm.setValue(this.cliente);
        console.log(res)
      }
    });
  }

  actualizarCliente(){
    console.log("actualizando cliente")
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      return;
    }
    this.service.updateClient(this.myForm.value).subscribe(res=>{
      this.messageModal('', 'operacion exitosa');
    },error=>{
      this.messageModal('Error', error.error.message);
    });
  }

  eliminarCLiente(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched()
      return;
    }
    this.service.deleteCliente(this.myForm.controls['idCliente'].value).subscribe(()=>{
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
    this.router.navigate(['clientes']);
  }
}
