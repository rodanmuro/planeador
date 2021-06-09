let filas = [
  {
    0: "1",
    lunes: "m",
    martes: "",
    miercoles: "n",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "2",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "3",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "4",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "5",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "6",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "7",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "8",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "9",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
  {
    0: "10",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  },
];

let materiaFechas = {};

//Esta función recorre todo el horario y toma el objeto materiaFechas para agregarle un elemento materia:[]
//por cada una de las materias encontradas
function arregloMateriasDistintas(objetoHorario) {
  objetoHorario.forEach((filaHorario, i) => {
    Object.entries(filaHorario).forEach((diaMateria, j) => {
      if (j > 0) {
        //console.log(diaMateria[1]);//acá estoy obteniendo la materia, luego este valor lo debo guardar en un arreglo de materias
        if (diaMateria[1] !== "") {
          if (!(diaMateria[1] in materiaFechas)) {
            let clave = diaMateria[1];
            Object.assign(materiaFechas, { [clave]: [] });
          }
        }
      }
    });
  });
}

//Esta función recorre todo el horario y y determina si el día dado tiene clase
function eseDiaTieneClase(objetoHorario, materia, date) {
  let tieneClase = false;

  objetoHorario.forEach((filaHorario, i) => {
    Object.entries(filaHorario).forEach((diaMateria, j) => {
      if (j > 0 && j == convertirDiaLetraAIndiceColumna(diaMateria[0])) {
        //console.log(diaMateria[0]+' '+diaMateria[1]+' '+(diaMateria[1] == materia)+' '+date.getDay()+' '+convertirDiaLetraADiaNumero(diaMateria[0]));
        if (
          diaMateria[1] == materia &&
          date.getDay() === convertirDiaLetraADiaNumero(diaMateria[0])
        ) {
          tieneClase = true;
        }
      }
    });
  });

  return tieneClase;
}

//agregar fechas a las materias. se recorre desde una fecha inicial a una final
//y se determina cual de los dias corresponden con una día en que la materia está asignada
function agregarFechasAMaterias(
  objetoHorario,
  objetoMaterias,
  fechaInicial,
  fechaFinal
) {
  for (let i = fechaInicial; i < fechaFinal; i = agregarDias(i, 1)) {
    Object.entries(objetoMaterias).forEach((mFechas) => {
      if (eseDiaTieneClase(objetoHorario, mFechas[0], i) === true) {
        let fechaAAgregar = new Date();
        fechaAAgregar = i;
        mFechas[1].push(fechaAAgregar);
      }
    });
    console.log(i);
  }
}

function convertirDiaLetraADiaNumero(diaLetra) {
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

function convertirDiaLetraAIndiceColumna(diaLetra) {
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
function agregarDias(f, numeroDias) {
  f.setDate(f.getDate() + numeroDias);
  return f;
}

arregloMateriasDistintas(filas);
agregarFechasAMaterias(
  filas,
  materiaFechas,
  new Date(2021, 0, 29),
  new Date(2021, 1, 25)
);
console.log(materiaFechas);
