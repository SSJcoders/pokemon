import { useLocation, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import DetailPage from "./DetailPage";

function ValidateDetailPage() {
  let params = useParams();
  let pokemonId = params.id.match(/\b([1-9]|[1-9][0-9]|1[0-4][0-9]|15[0-1])\b/);

  const pokemon = useLocation()?.state?.pokemon;

  if (!pokemonId) {
    return <ErrorPage />;
  }

  return <DetailPage pokemon={pokemon} />;
}

export default ValidateDetailPage;
