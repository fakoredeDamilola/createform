import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  authenticatedRoutes,
  unauthenticatedRoutes,
} from "./utils/routeComponents";
import AuthLayout from "./Layout/AuthLayout";
import Spinner from "./components/Spinner";

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {unauthenticatedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}

          <Route element={<AuthLayout />}>
            {authenticatedRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
