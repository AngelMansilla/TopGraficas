import React from "react";

import ListOfNoticias from "../../components/ListOfNoticias";
import HeaderNoticias from "../../components/Header/noticias";

export default function Noticias() {
  return (
    <>
      {sessionStorage.getItem("isAdmin") === "1" && <HeaderNoticias />}
      <ListOfNoticias />
    </>
  );
}
