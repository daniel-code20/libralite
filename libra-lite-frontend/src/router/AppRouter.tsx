import { Navigate, Route, Routes } from 'react-router-dom';
import {
  PrincipalPage,
  BookDetail,
  CategoryDetail,
  BuyPage,
  ReservationPage,
  Login,
  SignUp,
} from '../pages/';
import { AdminPrincipalPage } from '../admin/pages/AdminPrincipalPage';
import { AdminCategoryDetail } from '../admin/pages/AdminCategoryDetail';
import { AdminBookDetail } from '../admin/pages/AdminBookDetail';


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="principal" element={<PrincipalPage />} />
        <Route path="admin-principal" element={<AdminPrincipalPage />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/admin-book/:id" element={<AdminBookDetail />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/admin-category/:id" element={<AdminCategoryDetail />} />
        <Route path="/buy/:id" element={<BuyPage />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />
      </Routes>
    </>
  );
};
