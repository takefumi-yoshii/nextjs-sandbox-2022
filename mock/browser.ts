import { setupWorker } from "msw";

export const handlers = [];

export const worker = setupWorker(...handlers);
