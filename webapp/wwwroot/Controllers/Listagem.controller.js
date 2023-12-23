sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "../model/formatter"
], (Controller, JSONModel, formatter) => {
  "use strict";

  return Controller.extend("webapp.Controllers.Listagem", {
    formatter: formatter,
    onInit() {
      this._carregarLivros();

      this.fragmentoDetalhes = sap.ui.xmlfragment(
        this.getView().getId("fragmentoDeDetalhes"),
        "webapp.Views.Detalhes",
        this
      );
    },

    _carregarLivros() {
      const URL_API = "/api/Livros";

      fetch(URL_API)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          const livrosJSON = Object.values(response);
          const { lidos, paraLer } = livrosJSON.reduce(
            (acc, livro) => {
              livro.statusDeProgresso
                ? acc.lidos.push(livro)
                : acc.paraLer.push(livro);
              return acc;
            },
            { lidos: [], paraLer: [] }
          );

          this.getView().setModel(new JSONModel(lidos), "livrosLidos");
          this.getView().setModel(new JSONModel(paraLer), "livrosParaLer");
        })
        .catch((erro) => {
          console.log(erro);
        });
    },

    aoPressionarLivroLidos(evt) {
      let id = evt
        .getSource()
        .getBindingContext("livrosLidos")
        .getProperty("livroId");
      this._aoAbrirDetalhes(id);
    },

    aoPressionarLivroParaLer(evt) {
      let id = evt
        .getSource()
        .getBindingContext("livrosParaLer")
        .getProperty("livroId");
      this._aoAbrirDetalhes(id);
    },

    aoListaReceberLivroNaoLido(evt) {
      let itemArrastado = evt.getSource();
      // let itemArrastado = evt.getParameter("draggedControl");
      let contextItemArrastado = itemArrastado.getBindingContext("livrosParaLer");
      if (!contextItemArrastado) return;

      let tabelaDeLivrosLidos = this.getView().byId("listaDeLivrosLidos");
      let modeloDaLista = tabelaDeLivrosLidos.getModel("livrosLidos");
      modeloDaLista.setProperty(
        "statusDeProgresso",
        "true",
        contextItemArrastado
      );

    },

    aoListaReceberLivroLido(evt) {
      let itemArrastado = evt.getSource();
      // let itemArrastado = evt.getParameter("draggedControl");
      console.log(itemArrastado)
      let contextItemArrastado = itemArrastado.getBindingContext("livrosLidos");
      if (!contextItemArrastado) return;
      console.log(contextItemArrastado)
      let tabelaDeLivrosLidos = this.getView().byId("listaDeLivrosParaLer");
      let modeloDaLista = tabelaDeLivrosLidos.getModel("livrosParaLer");
      console.log(modeloDaLista)
      modeloDaLista.setProperty(
        "statusDeProgresso",
        false,
        contextItemArrastado
      );
    },

    _aoAbrirDetalhes(id) {
      this.fragmentoDetalhes ??= this.loadFragment({
        name: "webapp.Views.Detalhes",
      });

      fetch(`/api/Livros/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.fragmentoDetalhes.setModel(new JSONModel(response), "livro");
          this.fragmentoDetalhes.open();
        })
        .catch((erro) => {
          console.log(erro);
        });
    },

    aoFecharDetalhes() {
      this.byId("fragmentoDeDetalhes").close();
    },

    aoPressionarBotaoDeCadastro() {
      this.getOwnerComponent().getRouter().navTo("cadastroDeLivros");
    },
  });
});
