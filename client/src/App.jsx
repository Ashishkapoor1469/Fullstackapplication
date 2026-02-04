import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Search,
  Profile,
  Inbox,
  Premium,
  LoginHs,
  More,
  Nortify,
  ResetPass,
  Language,
  EditProfile,
} from "./routes/pages";
import {
  Login,
  Register,
  Verify,
  Forget,
  PrivateRoute,
} from "./routes/auth-routes";
import { MainLayout } from "./components/layout";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<Verify />} />
      <Route path="/forget" element={<Forget />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/search" element={<Search />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/more" element={<More />} />
          <Route path="/login-history" element={<LoginHs />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route path="/nortification" element={<Nortify />} />
          <Route path="/language" element={<Language />} />
          <Route path="/edit" element={<EditProfile />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
