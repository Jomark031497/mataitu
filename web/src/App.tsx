import { Home, Login, Wallets } from "./routes";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/common";
import { AuthRoute, PrivateRoute } from "@/components/utility";
import Signup from "@/routes/Signup";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />

          <Route path="/wallets" element={<Wallets />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
