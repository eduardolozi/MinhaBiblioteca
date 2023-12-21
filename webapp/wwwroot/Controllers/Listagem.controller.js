sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment"
], (Controller, JSONModel, Fragment) => {
  "use strict";

  return Controller.extend("webapp.Controllers.Listagem", {
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
      let id = evt.getSource().getBindingContext("livrosLidos").getProperty("livroId");
      this._aoAbrirDetalhes(id)
    },

    aoPressionarLivroParaLer(evt) {
      let id = evt.getSource().getBindingContext("livrosParaLer").getProperty("livroId");
      this._aoAbrirDetalhes(id)
    },

    _aoAbrirDetalhes(id) {
      this.fragmentoDetalhes ??= this.loadFragment({
        name: "webapp.Views.Detalhes",
      });

      fetch(`/api/Livros/${id}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
                  
          this.fragmentoDetalhes.setModel(new JSONModel(response), "livro");
          this.fragmentoDetalhes.open()
        })
        .catch(erro => {
          console.log(erro);
        })
    },

    aoFecharDetalhes() {
      this.byId("fragmentoDeDetalhes").close();
    },
  });
});
