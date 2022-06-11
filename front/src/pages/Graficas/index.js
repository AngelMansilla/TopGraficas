import React from "react";

import ListOfGraficas from "../../components/ListOfGraficas";
import HeaderGraficas from "../../components/Header/graficas";

export default function Graficas() {
  return (
    <>
      {sessionStorage.getItem("isAdmin") === '1' && <HeaderGraficas />}
      <ListOfGraficas />
    </>
  );
}
