sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("webapp.Controllers.Listagem", {
    onInit() {
      this._carregarLivros()
    },

    _carregarLivros() {
      const URL_API = "/api/Livros";

      fetch(URL_API)
        .then(response => {
          return response.json();
        })
        .then(response => {
          const livrosJSON = Object.values(response);

          const { lidos, paraLer } = livrosJSON.reduce(
            (acc, livro) => {
              livro.statusDeProgresso ? acc.lidos.push(livro) : acc.paraLer.push(livro);
              return acc;
            },
            { lidos: [], paraLer: [] }
          );

          this.getView().setModel(new JSONModel(lidos), "livrosLidos");
          this.getView().setModel(new JSONModel(paraLer), "livrosParaLer");
        })
        .catch(erro => {
        console.log(erro)
      })
    }
  });
});
