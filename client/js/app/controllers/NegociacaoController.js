class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            //Aqui vou passar os parametros separados ao invez de um array
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
    }

    importaNegociacoes() {
        let negociacaoService = new NegociacaoService();

        Promise.all([
                negociacaoService.getNegociacoesDaSemana(),
                negociacaoService.getNegociacoesDaSemanaSemanaAnterior(),
                negociacaoService.getNegociacoesDaSemanaRetrasada()
            ])
            .then(negociacoes => {
                negociacoes.reduce((newArray, oldArray) => newArray.concat(oldArray), [])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociacões importadas com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {
        if (this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        
        this._ordemAtual = coluna;
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}
