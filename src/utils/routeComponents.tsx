import { lazy } from "react";
import { routes } from "./routes";
import { IRouteComponent } from "../interfaces/IRouteComponent";

const Home = lazy(() => import("../pages/Home/Home"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const CreateForm = lazy(() => import("../pages/createForm/CreateForm"));
const Content = lazy(() => import("../pages/content/Content"));
const Result = lazy(() => import("../pages/result/Result"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const ResultPage = lazy(() => import("../pages/ResultPage"));
const ContentWithResult = lazy(() => import("../pages/ContentWithResult"));

const authenticatedRoutes: IRouteComponent[] = [
  { path: routes.dashboard, component: Dashboard },
  { path: routes.createForm, component: CreateForm },
  { path: routes.result, component: Result },
  { path: routes.resultPage, component: ResultPage },
];

const unauthenticatedRoutes: IRouteComponent[] = [
  { path: routes.home, component: Home },
  { path: routes.contentForm, component: Content },
  { path: routes.contentResultPage, component: ContentWithResult },
  { path: routes.login, component: Login },
  { path: routes.signup, component: Signup },
];

export { authenticatedRoutes, unauthenticatedRoutes };
