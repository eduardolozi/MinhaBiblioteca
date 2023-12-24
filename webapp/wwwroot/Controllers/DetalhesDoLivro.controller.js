sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/model/json/JSONModel"],
  (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("webapp.Controller.DetalhesDoLivro", {
      onInit() {
        const roteador = this.getOwnerComponent().getRouter();
        const rotaDeDetalhes = "detalhesDoLivro";
        roteador.getRoute(rotaDeDetalhes).attachPatternMatched(this._objetoCorrespondente, this);
        this._carregarLivroPorId()
      },

      _objetoCorrespondente(evt) {
        const argumentos = "arguments";
        let indiceDoLivro = window.decodeURIComponent(evt.getParameter(argumentos).id)
        this._carregarLivroPorId(indiceDoLivro)
      },

      _carregarLivroPorId(idDoLivro) {
        const URL_API = `api/Livros/${idDoLivro}`;

        fetch(URL_API)
          .then(response => {
            return response.json();
          })
          .then(response => {
            this.getView().setModel(new JSONModel(response), "livro")
          })
          .catch(erro => {
            console.log(erro);
          })
      },

      aoPressionarBotaoDeVoltar() {
        const historico = History.getInstance();
        const hashAnterior = historico.getPreviousHash();

        if (hashAnterior !== undefined) {
          window.history.go(-1);
        } else {
          this.getOwnerComponent().getRouter().navTo("listagem");
        }
      },
    });
  }
);
