"use client";

import { StrictMode, useEffect } from 'react';
import {
  getDbConnectionBuilder,
  disconnectDbConnection
} from "@/lib/spacetimedb/connection";

import { SpacetimeDBProvider as BuiltinSpacetimeDBProvider, useSpacetimeDB } from 'spacetimedb/react';
import { DbConnection } from '@/lib/tourney-manager';

const SpacetimeDBProvider = ({ children }: { children: React.ReactNode }) => {
  /* useEffect(() => {
    getDbConnectionBuilder();

    return () => {
      disconnectDbConnection();
    };
  }, []);
 */
  const builder = DbConnection.builder()
    .withUri('http://localhost:1234')
    .withModuleName('tm-tourney-manager');




  // It doesn't need to render anything itself, just pass children through.
  return <StrictMode><BuiltinSpacetimeDBProvider connectionBuilder={builder}>{children}</BuiltinSpacetimeDBProvider></StrictMode>;
};

export default SpacetimeDBProvider;

