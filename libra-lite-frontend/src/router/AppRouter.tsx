import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import SignUp from "../pages/SignUp";
import { AdminPage } from "../pages/adminPage";
import { ClientPage } from "../pages/clientPage";
import BookList from "../pages/DashboardPage";



export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="admin" element={<AdminPage/>} />
        <Route path="client" element={<ClientPage />} />
        <Route path="dashboard" element={<BookList />} />
      </Routes>
    </>
  );
};
