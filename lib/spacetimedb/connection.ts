'use client'

import { DbConnection } from '@/lib/tourney-manager';
import { onConnect, onConnectError, onDisconnect } from './connectionHandlers';
import { cleanupConnectionListener } from './connectionEvents';
import { cleanupSubscriptionListener } from './subscriptionEvents';
import { DbConnectionBuilder } from 'spacetimedb';

//let singletonConnection: DbConnection | null = null;

export const getDbConnectionBuilder = (): DbConnectionBuilder => {
  const isSSR = typeof window === 'undefined';
  if (isSSR) {
    throw new Error('Cannot use SpacetimeDB on the server.');
  }

  if (singletonConnection) {
    return singletonConnection;
  }

  singletonConnection = buildDbConnection()
  return DbConnection.builder()
    .withUri('http://localhost:1234')
    .withModuleName('tm-tourney-manager')
    .withToken(getAuthToken())
    .onConnect(onConnect)
    .onDisconnect(onDisconnect)
    .onConnectError(onConnectError);
};

const buildDbConnection = () => {
  console.log('[SpacetimeDB] Building connection...');
  return DbConnection.builder()
    .withUri('http://localhost:1234')
    .withModuleName('tm-tourney-manager')
    .withToken(getAuthToken())
    .onConnect(onConnect)
    .onDisconnect(onDisconnect)
    .onConnectError(onConnectError)
    .build();
}

const getAuthToken = () => {
  const token = localStorage.getItem('auth_token');
  if (token)
    return token;
  return "";
}

export const disconnectDbConnection = () => {
  if (singletonConnection) {
    console.log('[SpacetimeDB] Disconnecting...');
    singletonConnection.disconnect();
    singletonConnection = null;
  }
  cleanupConnectionListener();
  cleanupSubscriptionListener();
};
