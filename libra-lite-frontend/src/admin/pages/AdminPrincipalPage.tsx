import { Footer, SearchBar } from '../../components';
import { AdminActiveSlider } from '../components/AdminActiveSlider';
import { AdminCategoryCard } from '../components/AdminCategoryCard';

export const AdminPrincipalPage = () => {
  return (
    <>
      <SearchBar/>
      <AdminActiveSlider />
      <AdminCategoryCard />
      <Footer />
    </>
  );
};


