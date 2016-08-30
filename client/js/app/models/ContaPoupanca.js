class ContaPoupanca extends Conta {
    constructor() {

    }

    atualiza(taxa) {
        return this._saldo += (taxa * 2);
    }
}
