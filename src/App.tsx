import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QuestionProvider } from "./contexts/QuestionContext";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import QuestionDetail from "./pages/QuestionDetail";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Home />} />
          <Route path="category/:name" element={<CategoryPage />} />
          <Route path="question/:id" element={<QuestionDetail />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QuestionProvider>
        <Router basename="/noodle-jobs">
          <AnimatedRoutes />
        </Router>
      </QuestionProvider>
    </ThemeProvider>
  );
}

export default App;
