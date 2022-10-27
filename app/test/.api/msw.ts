if (process.env.MOCKING_ENABLED === "true") {
  const { server } = require("@/mock/server");
  server.use(
    ...require("./getMessage/mock").handlers,
    ...require("./getTime/mock").handlers
  );
}
export {};
