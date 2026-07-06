export const ROUTES = {
  DASHBOARD: '/',
  CATALOGO: '/catalogo',
  CLIENTI: '/clienti',
  STORICO_NOLEGGI: '/storico-noleggi',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];