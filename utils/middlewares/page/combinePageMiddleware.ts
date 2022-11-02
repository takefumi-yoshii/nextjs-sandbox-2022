import { ReactElement } from "react";

type P<T = {}, U = {}> = { params: T; searchParams: U } | ReactElement;
type MaybePromise<T extends P> = Promise<T> | T;

export function combinePageMiddlewares<A extends P, B extends ReactElement>(
  ab: (a: A) => MaybePromise<B>
): (a: MaybePromise<A>) => Promise<B>;

export function combinePageMiddlewares<
  A extends P,
  B extends P,
  C extends ReactElement
>(
  ab: (a: A) => MaybePromise<B>,
  bc: (b: B) => MaybePromise<C>
): (a: MaybePromise<A>) => Promise<C>;

export function combinePageMiddlewares<
  A extends P,
  B extends P,
  C extends P,
  D extends ReactElement
>(
  ab: (a: A) => MaybePromise<B>,
  bc: (b: B) => MaybePromise<C>,
  cd: (c: C) => MaybePromise<D>
): (a: MaybePromise<A>) => Promise<D>;

export function combinePageMiddlewares<
  A extends P,
  B extends P,
  C extends P,
  D extends P,
  E extends ReactElement
>(
  ab: (a: A) => MaybePromise<B>,
  bc: (b: B) => MaybePromise<C>,
  cd: (c: C) => MaybePromise<D>,
  de: (d: D) => MaybePromise<E>
): (a: MaybePromise<A>) => Promise<E>;

export function combinePageMiddlewares<
  A extends P,
  B extends P,
  C extends P,
  D extends P,
  E extends P,
  F extends ReactElement
>(
  ab: (a: A) => MaybePromise<B>,
  bc: (b: B) => MaybePromise<C>,
  cd: (c: C) => MaybePromise<D>,
  de: (d: D) => MaybePromise<E>,
  ef: (e: E) => MaybePromise<F>
): (a: MaybePromise<A>) => Promise<F>;

export function combinePageMiddlewares<
  A extends P,
  B extends P,
  C extends P,
  D extends P,
  E extends P,
  F extends P,
  G extends ReactElement
>(
  ab: (a: A) => MaybePromise<B>,
  bc: (b: B) => MaybePromise<C>,
  cd: (c: C) => MaybePromise<D>,
  de: (d: D) => MaybePromise<E>,
  ef: (e: E) => MaybePromise<F>,
  fg: (f: F) => MaybePromise<G>
): (a: MaybePromise<A>) => Promise<G>;

export function combinePageMiddlewares<
  A extends P,
  B extends P,
  C extends P,
  D extends P,
  E extends P,
  F extends P,
  G extends P,
  H extends ReactElement
>(
  ab: (a: A) => MaybePromise<B>,
  bc: (b: B) => MaybePromise<C>,
  cd: (c: C) => MaybePromise<D>,
  de: (d: D) => MaybePromise<E>,
  ef: (e: E) => MaybePromise<F>,
  fg: (f: F) => MaybePromise<G>,
  gh: (h: H) => MaybePromise<H>
): (a: MaybePromise<A>) => Promise<H>;

export function combinePageMiddlewares(...fns: Function[]) {
  return function (prev: unknown) {
    return fns.reduce(async (next, fn) => fn(await next), prev);
  };
}
