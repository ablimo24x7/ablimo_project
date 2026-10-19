"use client";

import * as React from "react";

const StructurePermissionsContext = React.createContext(true);

/**
 * Lets the post editor tell nested editors (sections, items, FAQs, tags)
 * whether the current user may add or remove structural content.
 * Defaults to `true`, so components used elsewhere keep their normal behavior.
 */
export function StructurePermissionsProvider({
  canManage,
  children,
}: {
  canManage: boolean;
  children: React.ReactNode;
}) {
  const value = React.useMemo(() => canManage, [canManage]);
  return (
    <StructurePermissionsContext.Provider value={value}>
      {children}
    </StructurePermissionsContext.Provider>
  );
}

export function useCanManageStructure(): boolean {
  return React.useContext(StructurePermissionsContext);
}
