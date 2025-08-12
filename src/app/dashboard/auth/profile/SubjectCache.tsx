"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Subject } from "@/lib/types";

type CacheSubjectContextType = {
  cacheSubject: Map<string, Subject>;
  setCacheSubject: (cache: Map<string, Subject>) => void;
};

export const CacheSubjectContext = createContext<CacheSubjectContextType | undefined>(undefined);

export const CacheSubjectProvider = ({ children }: { children: ReactNode }) => {
  const [cacheSubject, setCacheSubject] = useState<Map<string, Subject>>(new Map());

  return (
    <CacheSubjectContext.Provider value={{ cacheSubject, setCacheSubject }}>
      {children}
    </CacheSubjectContext.Provider>
  );
};

export const useCacheSubject = () => {
  const context = useContext(CacheSubjectContext);
  if (context === undefined) {
    throw new Error("useCacheSubject must be used within a CacheSubjectProvider");
  }
  return context;
};
