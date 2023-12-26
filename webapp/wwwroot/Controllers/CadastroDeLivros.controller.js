sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
  ],
  (Controller, JSONModel, Filter, FilterOperator, History) => {
    "use strict";

    return Controller.extend("webapp.Controllers.CadastroDeLivros", {
      onInit() {
        this._carregarLivros();
      },

      _carregarLivros() {
        const URL_API = "/api/Livros";

        fetch(URL_API)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            this.getView().setModel(new JSONModel(response), "livros");
          })
          .catch((erro) => {
            console.log(erro);
          });
      },

      aoFiltrarLivro(evt) {
        const consulta = evt.getParameter("query");
        const filtros = []; 

        if(consulta) {
          this._carregarLivroPeloNome(consulta)
            .then((livros) => {
              filtros.push(livros.map(livro => new Filter("titulo", FilterOperator.Contains, livro.titulo)));
              this._aplicaFiltro(filtros)
            }
          );          
        } else {
          this._aplicaFiltro(filtros)
        }
      },

      _aplicaFiltro(filtros) {
        const oList = this.byId("tabelaLivros");
        const oBindigin = oList.getBinding("items");
        oBindigin.filter(filtros);
      },

      _carregarLivroPeloNome(titulo) {
        const URL_API = `/api/Livros?titulo=${titulo}`;

        return fetch(URL_API)
          .then((response) => {
            return response.json();
          })
          .catch((erro) => {
            console.log(erro);
          });
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