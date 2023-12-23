sap.ui.define([], () => {
  "use strict";

  return {
    formataFoto(foto) {
      const cabecalhoParaFoto = "data:image/png;base64,";
      const fotoIndisponivel = "https://i.imgur.com/FHiN4BG.png";

      return foto ? (cabecalhoParaFoto + foto) : fotoIndisponivel;
    } 
  };
});
