import { saveAs } from "file-saver";
const ExcelJs = require("exceljs");

function convertirIndiceDiaADiaLetra(fecha) {
  var i = fecha.getDay();

  if (i === 0) {
    return "Domingo";
  }
  if (i === 1) {
    return "Lunes";
  }
  if (i === 2) {
    return "Martes";
  }
  if (i === 3) {
    return "Miércoles";
  }
  if (i === 4) {
    return "Jueves";
  }
  if (i === 5) {
    return "Viernes";
  }
  if (i === 6) {
    return "Sábado";
  }
}

//funcion que agrega un dia a una fecha dada y retorna dicha fecha aumentada
function agregarDias(f, numeroDias) {
  f.setDate(f.getDate() + numeroDias);
  return f;
}

export default function crearLibro(materiaFechas) {
  const workbook = new ExcelJs.Workbook();
  //let worksheet = workbook.addWorksheet("Hoja1");

  Object.entries(materiaFechas).forEach((elementoMateriaFechas) => {
    var materia = elementoMateriaFechas[0];
    let worksheet = workbook.addWorksheet(materia);

    worksheet.columns = [
      { header: "Grupo", key: "grupo", width: 10 },
      { header: "Fecha", key: "fecha", width: 12 },
      { header: "DíaSemana", key: "diaSemana", width: 11 },
      { header: "Secuencia de actividades", key: "secuencia", width: 30 },
      { header: "Instrumentos de evaluación", key: "instrumentos", width: 30 },
      { header: "Observaciones", key: "observaciones", width: 30 },
    ];

    elementoMateriaFechas[1].forEach((fecha) => {
      var f = new Date(fecha);
      var diaSemana = convertirIndiceDiaADiaLetra(f);
      worksheet.addRow([materia, agregarDias(f, -1), diaSemana,'','','']);
    });

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
  });

  
  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "planes de aula.xlsx");
  });  
}
