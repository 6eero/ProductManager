"use client";

import * as R from "ramda";
import React, { useContext, useEffect, createContext, useRef } from "react";
import Loading from "./Loading";
import { ErrorBlock } from "../error/ErrorBlock";
import { useAppActions } from "@/api/App/tasks";

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
  noWhoAmI,
}: ResourceLoaderProps) => {
  const state = useContext(context || DummyContext);
  const { onWhoAmI } = useAppActions();
  const { loading, error } = state;
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      if (!R.isNil(onLoad)) {
        onLoad();
      }
      if (!noWhoAmI) {
        onWhoAmI();
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
    return <ErrorBlock error={error.response.data.error} />;
  }

  return children;
};
