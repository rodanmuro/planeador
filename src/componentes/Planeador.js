import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import crearLibro from "../funciones/crearLibro";
import { getCookie, setCookie } from "../funciones/handleCookies";
import { getParsedDate, agregarDias } from "../funciones/manejoFechas";
import {
  reiniciarMateriaFechas,
  arregloMateriasDistintas,
  agregarFechasAMaterias,
} from "../funciones/manejoMaterias";

const columns = [
  { key: "0", name: "", editable: false, width: 35 },
  { key: "lunes", name: "Lunes", editable: true, resizable: true },
  { key: "martes", name: "Martes", editable: true, resizable: true },
  { key: "miercoles", name: "Miércoles", editable: true, resizable: true },
  { key: "jueves", name: "Jueves", editable: true, resizable: true },
  { key: "viernes", name: "Viernes", editable: true, resizable: true },
  { key: "sabado", name: "Sábado", editable: true, resizable: true },
  { key: "domingo", name: "Domingo", editable: true, resizable: true },
];

let materiaFechas = {};

let rows = [
  {
    0: "1",
    lunes: "",
    martes: "",
    miercoles: "",
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

async function llamarApi(mF) {
  await fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(mF),
  })
    .then((res) => {
      return res.json();
    })
    .then((mj) => {
      console.log(mj);
    });
}

function Planeador() {
  if (getCookie("cookieTabla") !== "") {
    rows = JSON.parse(getCookie("cookieTabla"));
  }
  

  const [filas, setFilas] = useState(rows);
  let [fechaInicial, setFechaInicial] = useState(getParsedDate(new Date()));
  let [fechaFinal, setFechaFinal] = useState(
    getParsedDate(agregarDias(new Date(), 1))
  );

  if (getCookie("fechaInicial") !== "") {
    fechaInicial = getCookie("fechaInicial");
  }
  if (getCookie("fechaFinal") !== "") {
    fechaFinal = getCookie("fechaFinal");
  }

  return (
    <div>
      <div className="col-lg-4">
        <ReactDataGrid
          columns={columns}
          rowGetter={(i) => filas[i]}
          rowsCount={10}
          minHeight={400}
          enableCellSelect={true}
          minWidth={620}
          onGridRowsUpdated={({ fromRow, toRow, updated }) => {
            const filasEditadas = filas.slice();
            for (let i = fromRow; i <= toRow; i++) {
              filasEditadas[i] = { ...filasEditadas[i], ...updated };
            }
            rows = filasEditadas;
            setCookie("cookieTabla", JSON.stringify(rows), 7);
            setFilas(filasEditadas);
          }}
        />

        <div className="form-group" style={{ marginTop: "15px" }}>
          <div className="form-group">
            <label className="form-control">Fecha inicial</label>
            <input
              className="datepicker form-control"
              type="date"
              defaultValue={fechaInicial}
              onChange={(e) => {
                setFechaInicial(e.target.value);
                setCookie('fechaInicial',e.target.value,7);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-control">Fecha final</label>
            <input
              className="datepicker form-control"
              type="date"
              defaultValue={fechaFinal}
              onChange={(e) => {
                setFechaFinal(e.target.value);
                setCookie('fechaFinal',e.target.value,7);
              }}
            />
          </div>
          <button
            className="btn btn-default mx-auto"
            onClick={() => {
              reiniciarMateriaFechas(materiaFechas);
              arregloMateriasDistintas(filas, materiaFechas);
              agregarFechasAMaterias(
                filas,
                materiaFechas,
                new Date(fechaInicial),
                new Date(fechaFinal)
              );
              crearLibro(materiaFechas);
            }}
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Planeador;
