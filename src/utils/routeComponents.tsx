import { lazy } from "react";
import { routes } from "./routes";
import { IRouteComponent } from "../interfaces/IRouteComponent";

const Home = lazy(() => import("../pages/Home"));

const authenticatedRoutes = [];

const unauthenticatedRoutes: IRouteComponent[] = [
  { path: routes.home, component: Home },
];

export { authenticatedRoutes, unauthenticatedRoutes };
