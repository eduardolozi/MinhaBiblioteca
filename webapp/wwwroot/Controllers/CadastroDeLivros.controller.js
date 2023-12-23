sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  (Controller, History) => {
    "use strict";

    return Controller.extend("webapp.Controllers.CadastroDeLivros", {
      onInit() {},

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