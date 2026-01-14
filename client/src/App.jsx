import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Feed, Search, Profile } from "./routes/pages";
import {
  Login,
  Register,
  Verify,
  ResetPass,
  Forget,
  PrivateRoute,
} from "./routes/auth-routes";
import NotFound from "./err/NotFound";
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
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
