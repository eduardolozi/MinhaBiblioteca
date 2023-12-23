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
          const { lidos, paraLer } = response.reduce(
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

    aoPressionarLivroLido(evt) {
      // debugger
      let modelo = evt.getSource().getBindingContext("livrosLidos");
      let idDoLivro = modelo.getProperty("livroId");
      this.getOwnerComponent().getRouter().navTo("detalhesDoLivro", {id: idDoLivro})
    },

    aoPressionarLivroParaLer(evt) {
      let id = evt
        .getSource()
        .getBindingContext("livrosParaLer") 
        .getProperty("livroId");
      this._aoAbrirDetalhes(id);
    },

    onBeforeOpenContextMenu(evt) {
      evt.getParameter("listItem").setSelected(true);
    },

    aoListaReceberLivroNaoLido(evt) {
      let itemArrastado = evt.getParameter("draggedControl");
      let contextItemArrastado = itemArrastado.getBindingContext("livrosParaLer");
      let livro = contextItemArrastado.getObject();
      if (!contextItemArrastado) return;

      contextItemArrastado.getModel().setProperty("statusDeProgresso", true, contextItemArrastado)
      let tabelaDeLivrosLidos = this.getView().byId("listaDeLivrosLidos");
      let modeloDeLivrosParaLer = contextItemArrastado.getModel();
      let modeloDaListaDeLidos = tabelaDeLivrosLidos.getModel("livrosLidos");

      modeloDeLivrosParaLer.getProperty("/").splice(contextItemArrastado.getPath().split("/")[1], 1)

      modeloDaListaDeLidos.getProperty("/").push(livro);

      modeloDaListaDeLidos.refresh()
      modeloDeLivrosParaLer.refresh()
    },

    aoListaReceberLivroLido(evt) {
      let itemArrastado = evt.getParameter("draggedControl");
      let contextItemArrastado = itemArrastado.getBindingContext("livrosLidos");
      let livro = contextItemArrastado.getObject();
      if (!contextItemArrastado) return;

      contextItemArrastado.getModel().setProperty("statusDeProgresso", false, contextItemArrastado);
      let tabelaDeLivrosParaLer = this.getView().byId("listaDeLivrosParaLer");
      let modeloDeLivrosLidos = contextItemArrastado.getModel();
      let modeloDeLivrosParaLer = tabelaDeLivrosParaLer.getModel("livrosParaLer");

      modeloDeLivrosLidos.getProperty("/").splice(contextItemArrastado.getPath().split("/")[1], 1);

      modeloDeLivrosParaLer.getProperty("/").push(livro);

      modeloDeLivrosParaLer.refresh();
      modeloDeLivrosLidos.refresh();
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
