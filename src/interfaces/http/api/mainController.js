const api = (instance, method, params = []) => async ctx => {
  const args = processArgs(ctx, params);
  const data = await instance[method](...args);
  const response = ctx[ctx.method === "POST" ? "created" : "ok"];

  return response({ ...ctx.body, data });
};

const processArgs = (ctx, params) => {
  let args = ctx.params[param];

  args.push({
    user: ctx.state.user,
    ...(ctx.method === "GET"
      ? processQueryParametersForService(ctx.query)
      : ctx.request.body)
  });

  return args;
};
module.exports = api;
