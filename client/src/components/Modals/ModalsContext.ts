import { createContext } from "react";

import { ICreatingModal } from "../../interface/ICreatingModal";

export const ModalsContext = createContext<ICreatingModal>(
  {} as ICreatingModal
);
