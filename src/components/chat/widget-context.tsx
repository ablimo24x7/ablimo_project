"use client";

import * as React from "react";

interface WidgetOverrideContextValue {
  isCityTemplate: boolean;
  setCityTemplate: (value: boolean) => void;
  pageWhatsappNumber: string;
  setPageWhatsappNumber: (value: string) => void;
}

const WidgetOverrideContext = React.createContext<WidgetOverrideContextValue>({
  isCityTemplate: false,
  setCityTemplate: () => {},
  pageWhatsappNumber: "",
  setPageWhatsappNumber: () => {},
});

export function WidgetOverrideProvider({ children }: { children: React.ReactNode }) {
  const [isCityTemplate, setCityTemplate] = React.useState(false);
  const [pageWhatsappNumber, setPageWhatsappNumber] = React.useState("");
  const value = React.useMemo(
    () => ({ isCityTemplate, setCityTemplate, pageWhatsappNumber, setPageWhatsappNumber }),
    [isCityTemplate, pageWhatsappNumber]
  );
  return (
    <WidgetOverrideContext.Provider value={value}>
      {children}
    </WidgetOverrideContext.Provider>
  );
}

export function useWidgetOverride() {
  return React.useContext(WidgetOverrideContext);
}

/** Register the current page as a city services template page while mounted. */
export function useCityTemplateFlag(active: boolean) {
  const { setCityTemplate } = useWidgetOverride();
  React.useEffect(() => {
    if (!active) return;
    setCityTemplate(true);
    return () => setCityTemplate(false);
  }, [active, setCityTemplate]);
}

/** Apply a per-page WhatsApp number override to the widget while mounted. */
export function usePageWhatsappNumber(active: boolean, number?: string | null) {
  const { setPageWhatsappNumber } = useWidgetOverride();
  React.useEffect(() => {
    if (!active) return;
    setPageWhatsappNumber(number?.trim() || "");
    return () => setPageWhatsappNumber("");
  }, [active, number, setPageWhatsappNumber]);
}
