class NegociacaoService {
    constructor() {
        this._httpService = new HttpService();
    }

    getNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data),
                                                                                  negociacao.quantidade,
                                                                                  negociacao.valor)));
                })
                .catch(erro => {
                  console.log(erro);
                  this._mensagem.texto = 'Não foi possível obter as negociacões da semana';
                });
        });
    }

    getNegociacoesDaSemanaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._httpService
              .get('negociacoes/anterior')
              .then(negociacoes => {
                  resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data),
                                                                                negociacao.quantidade,
                                                                                negociacao.valor)));

                })
              .catch(erro => {
                console.log(erro);
                this._mensagem.texto = 'Não foi possível obter as negociacões da semana anterior';
              });
        });
    }

    getNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data),
                                                                                  negociacao.quantidade,
                                                                                  negociacao.valor)));
                })
                .catch(erro => {
                  console.log(erro);
                  reject('Não foi possível obter as negociacões da semana retrasada');
                });
        });
    }
}
