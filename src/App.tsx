import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  authenticatedRoutes,
  unauthenticatedRoutes,
} from "./utils/routeComponents";
import AuthLayout from "./Layout/AuthLayout";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {unauthenticatedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
        <AuthLayout>
          <Routes>
            {authenticatedRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </AuthLayout>
      </Suspense>
    </Router>
  );
}

export default App;
