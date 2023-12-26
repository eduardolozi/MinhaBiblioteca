sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, JSONModel, formatter, Filter, FilterOperator) => {
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

      aoFiltrarLivroLido(evt) {
        let idLista = "listaDeLivrosLidos";
        this._filtraLivrosDasListas(evt, idLista);
        
      },

      aoFiltrarLivroParaLer(evt) {
        let idLista = "listaDeLivrosParaLer";
        this._filtraLivrosDasListas(evt, idLista);
      },

      _filtraLivrosDasListas(evt, idLista) {
        const consulta = evt.getParameter("query");
        const filtros = [];

        if (consulta) {
          this._carregarLivroPeloNome(consulta).then((livros) => {
            filtros.push(
              livros.map(
                (livro) =>
                  new Filter("titulo", FilterOperator.Contains, livro.titulo)
              )
            );
            this._aplicaFiltro(filtros, idLista);
          });
        } else {
          this._aplicaFiltro(filtros, idLista);
        }
      },

      _aplicaFiltro(filtros, idLista) {
        const oList = this.byId(idLista);
        const oBindigin = oList.getBinding("items");
        oBindigin.filter(filtros);
      },

      aoPressionarLivroLido(evt) {
        let modelo = evt.getSource().getBindingContext("livrosLidos");
        let idDoLivro = modelo.getProperty("livroId");
        this.getOwnerComponent()
          .getRouter()
          .navTo("detalhesDoLivro", { id: idDoLivro });
      },

      aoPressionarLivroParaLer(evt) {
        let modelo = evt.getSource().getBindingContext("livrosParaLer");
        let idDoLivro = modelo.getProperty("livroId");
        this.getOwnerComponent()
          .getRouter()
          .navTo("detalhesDoLivro", { id: idDoLivro });
      },

      aoListaReceberLivroNaoLido(evt) {
        let itemArrastado = evt.getParameter("draggedControl");
        let contextItemArrastado =
          itemArrastado.getBindingContext("livrosParaLer");
        let livro = contextItemArrastado.getObject();
        if (!contextItemArrastado) return;

        contextItemArrastado
          .getModel()
          .setProperty("statusDeProgresso", true, contextItemArrastado);
        let tabelaDeLivrosLidos = this.getView().byId("listaDeLivrosLidos");
        let modeloDeLivrosParaLer = contextItemArrastado.getModel();
        let modeloDaListaDeLidos = tabelaDeLivrosLidos.getModel("livrosLidos");

        modeloDeLivrosParaLer
          .getProperty("/")
          .splice(contextItemArrastado.getPath().split("/")[1], 1);

        modeloDaListaDeLidos.getProperty("/").push(livro);

        modeloDaListaDeLidos.refresh();
        modeloDeLivrosParaLer.refresh();
      },

      aoListaReceberLivroLido(evt) {
        let itemArrastado = evt.getParameter("draggedControl");
        let contextItemArrastado =
          itemArrastado.getBindingContext("livrosLidos");
        let livro = contextItemArrastado.getObject();
        if (!contextItemArrastado) return;

        contextItemArrastado
          .getModel()
          .setProperty("statusDeProgresso", false, contextItemArrastado);
        let tabelaDeLivrosParaLer = this.getView().byId("listaDeLivrosParaLer");
        let modeloDeLivrosLidos = contextItemArrastado.getModel();
        let modeloDeLivrosParaLer =
          tabelaDeLivrosParaLer.getModel("livrosParaLer");

        modeloDeLivrosLidos
          .getProperty("/")
          .splice(contextItemArrastado.getPath().split("/")[1], 1);

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
  }
);
