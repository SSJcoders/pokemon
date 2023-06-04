import { useLocation, useParams } from "react-router-dom";
import Error from "./Error";
import Detail from "./Detail";

function ValidateDetail() {
  let params = useParams();
  let pokemonId = params.id.match(/\b([1-9]|[1-9][0-9]|1[0-4][0-9]|15[0-1])\b/);

  const pokemon = useLocation()?.state?.pokemon;

  if (!pokemonId) {
    return <Error />;
  }

  return <Detail pokemon={pokemon} />;
}

export default ValidateDetail;
