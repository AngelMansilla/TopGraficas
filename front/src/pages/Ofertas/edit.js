import React from "react";

import FormOferta from "../../components/Form/formOferta";

export default function EditOferta({ params }) {
  return <FormOferta oferta_id={params ? params.id : 0} />;
}
