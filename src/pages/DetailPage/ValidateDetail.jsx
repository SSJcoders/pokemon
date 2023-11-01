import { useParams } from "react-router-dom";
import NotFound from "../../components/common/NotFound/NotFound";
import DetailPage from "./DetailPage";

function ValidateDetail() {
  const { pokemonId } = useParams();

  const isPokemonIdValid = pokemonId.match(
    /\b([1-9]|[1-9][0-9]|1[0-4][0-9]|15[0-1])\b/
  );

  if (!isPokemonIdValid) {
    return <NotFound text="존재하지 않는 페이지입니다." />;
  }

  return <DetailPage pokemonId={pokemonId} />;
}

export default ValidateDetail;
