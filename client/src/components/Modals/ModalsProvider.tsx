import { PropsWithChildren } from "react";

import { useModalAssets } from "./useModalAssets";
import { ModalsContext } from "./ModalsContext";

export const EditModalProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const addProductData = useModalAssets();

  return (
    <ModalsContext.Provider value={addProductData}>
      {children}
    </ModalsContext.Provider>
  );
};
