import { useContext } from "react";

import { ModalsContext } from "./ModalsContext";

export const useModalAssetsContext = () => {
  return useContext(ModalsContext);
};
