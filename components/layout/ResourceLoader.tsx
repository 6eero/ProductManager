"use client";

import * as R from "ramda";
import React, { useContext, useEffect, createContext, useRef } from "react";
import Loading from "./Loading";

const DummyContext = createContext({ loading: false, error: null });

type ResourceLoaderProps = {
  onLoad?: () => void | Promise<void>;
  context?: React.Context<any>;
  children: React.ReactNode;
  noWhoAmI?: boolean;
};

export const ResourceLoader = ({
  onLoad,
  children,
  context,
}: ResourceLoaderProps) => {
  const state = useContext(context || DummyContext);
  const { loading, error } = state;
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      if (!R.isNil(onLoad)) {
        onLoad();
      }
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }

  return children;
};
