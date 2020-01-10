const api = (instance, method, params = []) => async ctx => {
  const args = processArgs(ctx, params);
  const data = await instance[method](...args);
  const response = ctx[ctx.method === "POST" ? "created" : "ok"];

  return response({ ...ctx.body, data });
};

module.exports = api;
