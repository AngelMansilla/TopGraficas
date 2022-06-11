import React from "react";

import FormGrafica from "../../components/Form/formGrafica";

export default function EditGraficas({ params }) {
  return <FormGrafica grafica_id={params ? params.id : 0} />;
}
