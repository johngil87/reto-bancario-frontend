import { Cliente } from "./cliente";
import { Movimiento } from "./movimiento";

export interface Cuenta {
    numeroCuenta: number;
    tipoCuenta:   string;
    saldoInicial: number;
    estado:       boolean;
    cliente:      Cliente;
    movimientos:  Movimiento[];
}