import React from 'react';
import { Footer } from '../../components';
import { AdminActiveSlider } from '../components/AdminActiveSlider';
import { AdminCategoryCard } from '../components/AdminCategoryCard';
import AdminLogo from '../components/AdminLogo';
import { AdminSearchBar } from '../components/AdminSearchBar';

export const AdminPrincipalPage = () => {
  return (
    <>
      <AdminLogo />
      <AdminSearchBar />
      <AdminActiveSlider />
      <AdminCategoryCard />
      <Footer />
    </>
  );
};
