import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Definición de rutas como constantes
const ROUTES = {
  HOME: "/",
  CREATE: "/create",
  EDIT: "/edit/:id",
  DETAILS: "/task/:id",
};

// Lazy de las rutas
const Home = lazy(() => import("./pages/views/Home"));
const TaskForm = lazy(() => import("./components/TaskForm"));
const TaskDetails = lazy(() => import("./components/TaskDetails"));

function App() {
  return (
    <BrowserRouter>
          <Suspense>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.CREATE} element={<TaskForm />} />
              <Route path={ROUTES.EDIT} element={<TaskForm />} />
              <Route path={ROUTES.DETAILS} element={<TaskDetails />} />
            </Routes>
          </Suspense>
    </BrowserRouter>
  );
}

export default App;