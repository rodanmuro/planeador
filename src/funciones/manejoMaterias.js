import {agregarDias, convertirDiaLetraADiaNumero, convertirDiaLetraAIndiceColumna} from './manejoFechas';

export function reiniciarMateriaFechas(materiaFechas) {
    materiaFechas = {};
  }

  //Esta función recorre todo el horario y toma el objeto materiaFechas para agregarle un elemento materia:[]
//por cada una de las materias encontradas
export function arregloMateriasDistintas(objetoHorario, materiaFechas) {
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
export function eseDiaTieneClase(objetoHorario, materia, date) {
    let tieneClase = false;
  
    objetoHorario.forEach((filaHorario, i) => {
      Object.entries(filaHorario).forEach((diaMateria, j) => {
        if (j > 0 && j === convertirDiaLetraAIndiceColumna(diaMateria[0])) {
          //console.log(diaMateria[0]+' '+diaMateria[1]+' '+(diaMateria[1] == materia)+' '+date.getDay()+' '+convertirDiaLetraADiaNumero(diaMateria[0]));
          if (
            diaMateria[1] === materia &&
            date.getDay() === convertirDiaLetraADiaNumero(diaMateria[0])
          ) {
            tieneClase = true;
          }
        }
      });
    });
  
    return tieneClase;
  }

  //Esta función recorre todo el horario y y determina si el día dado tiene clase
export function numeroHorasDiaClase(objetoHorario, materia, date) {
  let tieneClase = 0;
  objetoHorario.forEach((filaHorario, i) => {
    Object.entries(filaHorario).forEach((diaMateria, j) => {
      if (j > 0 && j === convertirDiaLetraAIndiceColumna(diaMateria[0])) {
        //console.log(diaMateria[0]+' '+diaMateria[1]+' '+(diaMateria[1] == materia)+' '+date.getDay()+' '+convertirDiaLetraADiaNumero(diaMateria[0]));
        if (
          diaMateria[1] === materia &&
          date.getDay() === convertirDiaLetraADiaNumero(diaMateria[0])
        ) {
          tieneClase = tieneClase + 1;
        }
      }
    });
  });
  return tieneClase;
}

  //agregar fechas a las materias. se recorre desde una fecha inicial a una final
//y se determina cual de los dias corresponden con una día en que la materia está asignada
export function agregarFechasAMaterias(
    objetoHorario,
    objetoMaterias,
    fechaInicial,
    fechaFinal
  ) {
  
    fechaInicial = agregarDias(fechaInicial,1);
    fechaFinal = agregarDias(fechaFinal,1);
    
    for (let i = fechaInicial; i <= fechaFinal; i = agregarDias(i, 1)) {
      Object.entries(objetoMaterias).forEach((mFechas) => {
        let numeroHorasDia = numeroHorasDiaClase(objetoHorario, mFechas[0], i);
        if (numeroHorasDia>0) {
          for (let index = 0; index < numeroHorasDia; index++) {
            let fechaAAgregar = new Date(i);
            mFechas[1].push(fechaAAgregar);
          }
        }
      });
    }
  }