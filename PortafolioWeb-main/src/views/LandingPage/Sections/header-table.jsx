import React from "react";
import "./styles.css";

const WIDTH_CELL_USERNAME = 100;
const WIDTH_CELL_NAME = 120;
const WIDTH_CELL_PROFILE = 120;
const WIDTH_CELL_DESCRIPTION = 120;
const WIDTH_CELL_DOMAIN = 80;
const WIDTH_CELL_ACTIVE = 100;
const WIDTH_CELL_ACTION = 180;

export const getColumns = (props) => {
  const tamañoCelda = 20;

  const ActionButton = ({ action, id, name}) => {
    return (
        <input
          onClick={() => props.handleAction(id, action)}
          className="react-button-action"
          id={`react-button-new${id}`}
          type="button"
          value={name}
        />
    );
  };

  const Led = ({ isOn, id}) => {
    return (
      <div>
        <input
          checked={isOn}
          disabled={true}
          className="react-led-checkbox"
          id={`react-led-new${id}`}
          type="checkbox"
        />
        <label
          className="react-led-label"
          htmlFor={`react-led-new${id}`}
        >
          <span className={`react-led-button`} />
        </label>
      </div>
    );
  };

  const columns = [
    {
      Header: "N°",
      accessor: "id",
      minWidth: tamañoCelda,
      style: { whiteSpace: "unset", paddingTop: 30 }
    },
    {
      Header: "Username",
      accessor: "username",
      minWidth: WIDTH_CELL_USERNAME,
      width: WIDTH_CELL_USERNAME,
      style: { whiteSpace: "unset", paddingTop: 30 }
    },
    {
      Header: "Nombre",
      accessor: "name",
      minWidth: WIDTH_CELL_NAME,
      width: WIDTH_CELL_NAME,
      style: { whiteSpace: "unset", paddingTop: 30 }
    },
    {
      Header: "Perfil",
      accessor: "profile",
      minWidth: WIDTH_CELL_PROFILE,
      width: WIDTH_CELL_PROFILE,
      style: { whiteSpace: "unset", paddingTop: 30 }
    },
    {
      Header: "Descripción",
      accessor: "description",
      minWidth: WIDTH_CELL_DESCRIPTION,
      width: WIDTH_CELL_DESCRIPTION,
      style: { whiteSpace: "unset", paddingTop: 30 }
    },
    {
      Header: "Dominio",
      accessor: "domain",
      minWidth: WIDTH_CELL_DOMAIN,
      width: WIDTH_CELL_DOMAIN,
      style: { whiteSpace: "unset", paddingTop: 30 }
    },
    {
      Header: "Activo",
      minWidth: WIDTH_CELL_ACTIVE,
      width: WIDTH_CELL_ACTIVE,
      style: { whiteSpace: "unset", paddingLeft: 15 },
      filterable: false,
      Cell:(row) => <Led
          isOn={row.original.active}
          id={row.original.id}
        />
    },
    {
      Header: "Acción",
      width: WIDTH_CELL_ACTION,        
      style: { whiteSpace: "unset", paddingTop: 25},
      sortable: false,
      filterable: false,
      Cell: (row) => (
        <div>
          <ActionButton
            action="Delete"
            id={row.original.id}
            name="Eliminar"
          />
          <ActionButton
            action="Update"
            id={row.original.id}
            name="Actualizar"
          />
        </div>
      )
    }
  ];

  return columns;
};
