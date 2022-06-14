import React from "react";

import FormNoticia from "../../components/Form/formNoticia";

export default function EditNoticia({ params }) {
  return <FormNoticia noticia_id={params ? params.id : 0} />;
}
