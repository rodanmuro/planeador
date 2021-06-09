export function getParsedDate(date) {
  //var strSplitDate = String(strDate).split(' ');
  //var date = new Date(strSplitDate[0]);
  // alert(date);
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!

  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = yyyy + "-" + mm + "-" + dd;
  return date.toString();
}

export function convertirDiaLetraADiaNumero(diaLetra) {
  if (diaLetra === "domingo") {
    return 0;
  }
  if (diaLetra === "lunes") {
    return 1;
  }
  if (diaLetra === "martes") {
    return 2;
  }
  if (diaLetra === "miercoles") {
    return 3;
  }
  if (diaLetra === "jueves") {
    return 4;
  }
  if (diaLetra === "viernes") {
    return 5;
  }
  if (diaLetra === "sabado") {
    return 6;
  }
}

export function convertirDiaLetraAIndiceColumna(diaLetra) {
  if (diaLetra === "domingo") {
    return 7;
  }
  if (diaLetra === "lunes") {
    return 1;
  }
  if (diaLetra === "martes") {
    return 2;
  }
  if (diaLetra === "miercoles") {
    return 3;
  }
  if (diaLetra === "jueves") {
    return 4;
  }
  if (diaLetra === "viernes") {
    return 5;
  }
  if (diaLetra === "sabado") {
    return 6;
  }
}

//funcion que agrega un dia a una fecha dada y retorna dicha fecha aumentada
export function agregarDias(f, numeroDias) {
  f.setDate(f.getDate() + numeroDias);
  return f;
}
