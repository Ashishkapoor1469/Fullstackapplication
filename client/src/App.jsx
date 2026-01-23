import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Search, Profile, Inbox, Premium } from "./routes/pages";
import {
  Login,
  Register,
  Verify,
  ResetPass,
  Forget,
  PrivateRoute,
} from "./routes/auth-routes";
import NotFound from "./err/NotFound";
import { MainLayout } from "./components/layout";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<Verify />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/resetpass" element={<ResetPass />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/search" element={<Search />} />
          <Route path="/premium" element={<Premium />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
