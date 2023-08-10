import { getMonth } from "date-fns";
import { ReactNode, createContext, useContext, useState } from "react";

interface PointContextProps {
  month: number;
  onBackMonth: () => void;
  onNextMonth: () => void;
}

export const PointContext = createContext({} as PointContextProps);

export function PointProvider({ children }: { children: ReactNode }) {
  const [month, setMonth] = useState(getMonth(new Date()) + 1);

  function onBackMonth() {
    setMonth((item) => item - 1);
  }

  function onNextMonth() {
    setMonth((item) => item + 1);
  }

  return (
    <PointContext.Provider value={{ month, onBackMonth, onNextMonth }}>
      {children}
    </PointContext.Provider>
  );
}

export function usePointProvider() {
  const point = useContext(PointContext);
  return point;
}
