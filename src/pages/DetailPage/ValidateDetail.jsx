import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DetailPage from "./DetailPage";
import FallBackUI from "../../components/common/Error/FallBackUI";

function ValidateDetail() {
  const { pokemonId } = useParams();

  const isPokemonIdValid = pokemonId.match(
    /\b([1-9]|[1-9][0-9]|1[0-4][0-9]|15[0-1])\b/
  );

  const { t } = useTranslation();

  if (!isPokemonIdValid) {
    return <FallBackUI text={t("notFound")} hasNavigateBtn={true} />;
  }

  return <DetailPage pokemonId={pokemonId} />;
}

export default ValidateDetail;
