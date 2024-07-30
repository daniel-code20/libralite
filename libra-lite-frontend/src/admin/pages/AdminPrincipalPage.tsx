import React from 'react';
import { Footer } from '../../components';
import { AdminActiveSlider } from '../components/AdminActiveSlider';
import { AdminGenderCard } from '../components/AdminGenderCard';
import AdminLogo from '../components/AdminLogo';
import { AdminSearchBar } from '../components/AdminSearchBar';

export const AdminPrincipalPage = () => {
  return (
    <>
      <AdminLogo />
      <AdminActiveSlider />
      <AdminGenderCard />
      <Footer />
    </>
  );
};
