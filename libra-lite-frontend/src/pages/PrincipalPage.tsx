import React from 'react';
import { ActiveSlider, CategoryCard, Footer, SearchBar } from '../components';
import Logo from '../components/Logo';

export const PrincipalPage = () => {
  return (
    <>
      <Logo />
      <SearchBar />
      <ActiveSlider />
      <CategoryCard />
      <Footer />
    </>
  );
};
