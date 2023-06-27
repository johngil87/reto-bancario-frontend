import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  private numbersPattern: string ='^[0-9]+$';
  constructor() { }

  public onlyNumbers = (control: FormControl):ValidationErrors | null =>{
    const value : string = control.value.trim();  
    if(!value.match(this.numbersPattern)){
        return {
            noNumber: true
        }
    }
    return null
  }

  public onlyNames = (control: FormControl):ValidationErrors | null =>{
    const value : string = control.value.trim();  
    if(value.match(this.firstNameAndLastnamePattern)){
        return {
            noNames: true
        }
    }
    return null
  }

  public maxCharactersId = (control: FormControl):ValidationErrors | null =>{
    const value : number = control.value.length;  
    if(value > 12){
        return {
            maxId: true
        }
    }
    return null
  }
  
  public notCero = (control: FormControl):ValidationErrors | null =>{
    const value : number = control.value;  
    if(value <= 0){
        return {
            cero: true
        }
    }
    return null
  }

  public menorEdad = (control: FormControl):ValidationErrors | null =>{
    const value : number = control.value;  
    if(value < 18){
        return {
            menor: true
        }
    }
    return null
  }

  public edadMax = (control: FormControl):ValidationErrors | null =>{
    const value : number = control.value;  
    if(value > 100){
        return {
            edadmax: true
        }
    }
    return null
  }
}
