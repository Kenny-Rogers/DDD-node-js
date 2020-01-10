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

const processQueryParametersForService = query => {
  const maxResultsPerPage = 100;
  const allowedFilters = ["isPublished", "isPrivate"];
  const allowedOptions = ["count", "sort"];
  const allowedQueryParameters = [
    ...allowedFilters,
    ...allowedOptions,
    "limit",
    "skip",
    "page",
    "results"
  ];

  let opts = {};

  Object.keys(query).forEach(key => {
    if (query[key] && allowedQueryParameters.includes(key)) {
      if (config.allowedFilters.includes(key)) {
        opts.query = opts.query || {};
        opts.query[key] = query[key];
      } else {
        opts[key] = query[key];
      }
    }
  });

  if (opts.hasOwnProperty("page") && opts.hasOwnProperty("results")) {
    opts.limit = Math.min(opts.results, maxResultsPerPage);
    opts.skip = (opt.page - 1) * opts.limit;
  } else {
    opts.limit = opts.limit
      ? Math.min(opts.limit, maxResultsPerPage)
      : maxResultsPerPage;
  }

  return opts;
};
module.exports = api;
