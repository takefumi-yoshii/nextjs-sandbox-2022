if (process.env.MOCKING_ENABLED === "true") {
  const { server } = require("@/mock/server");
  server.use(...require("./getData/mock").handlers);
}
export {};
