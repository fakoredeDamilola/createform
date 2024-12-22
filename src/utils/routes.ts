export const routes = {
  home: "/",
  contact: "/contact",
  dashboard: "/dashboard",
  result: "/form/result/:formId",
  createForm: "/form/create/:formId",
  contentForm: "/g/:slug",
  login: "/login",
  signup: "/signup",
};

export const getRoute = (
  routeProps: string,
  params: { [key: string]: string }
) => {
  console.log({ routeProps, params });
  let path = routes[routeProps as keyof typeof routes];
  if (!path) {
    throw new Error(`Route name ${routeProps} does not exist`);
  }
  for (const param in params) {
    path = path.replace(`:${param}`, params[param]);
  }
  return path;
};
