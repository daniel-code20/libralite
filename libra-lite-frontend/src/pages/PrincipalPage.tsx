import React from 'react';
import { ActiveSlider, CategoryCard, Footer, SearchBar } from '../components';
import Logo from '../components/Logo';

export const PrincipalPage = () => {
  
  return (
    <div className="min-h-screen flex flex-col bg-[rgb(25,25,25)]">
      <header>
        <Logo />
        <SearchBar />
      </header>
      <main className="flex-grow">
        <ActiveSlider />
        <CategoryCard />
      </main>
      <Footer />
    </div>
  );
};
