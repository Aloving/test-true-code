import { useState } from "react";

export const useTableAssets = () => {
  const [searchString, setSearchString] = useState("");

  return {
    searchString,
    setSearchString,
  };
};
