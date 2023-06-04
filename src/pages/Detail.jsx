import { useLocation } from "react-router-dom";

function Detail() {
  const { state } = useLocation();
  const { pokemon } = state;

  return <div>{pokemon.names["kr"]}</div>;
}

export default Detail;
