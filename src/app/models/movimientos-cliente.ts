export interface MovimientosCliente {
    tipo:         string;
    valor:        number;
    saldo:        number;
    fecha:        Date;
    nombre:       string;
    saldoInicial: number;
    estado:       boolean;
    numeroCuenta: number;
    tipoCuenta:   string;
}
