export interface Movimiento {
    idMovimiento: number;
    fecha:        Date;
    tipo:         string;
    valor:        number;
    saldo:        number;
    idCLiente:    string;
    idCuenta:     number;
}