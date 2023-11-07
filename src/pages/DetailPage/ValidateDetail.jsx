import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NotFound from "../../components/common/NotFound/NotFound";
import DetailPage from "./DetailPage";

function ValidateDetail() {
  const { pokemonId } = useParams();

  const isPokemonIdValid = pokemonId.match(
    /\b([1-9]|[1-9][0-9]|1[0-4][0-9]|15[0-1])\b/
  );

  const { t } = useTranslation();

  if (!isPokemonIdValid) {
    return <NotFound text={t("notFound")} />;
  }

  return <DetailPage pokemonId={pokemonId} />;
}

export default ValidateDetail;
