import { useQuery, gql } from '@apollo/client';
import {  CircularProgress } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import AdminBookModal from '../../Modal/AdminBookModal';

interface Category {
  id: string;
  name: string;
}

const GET_ALL_BOOKS = gql`
  query Categories($id: ID!) {
    categories(where: { id: { equals: $id } }) {
      id
      name
    }
  }
`;

export const AdminCategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    variables: { id },
  });

  if (loading) return <CircularProgress label="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;
  const category: Category = data.categories[0];

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <AdminBookModal/>
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      </div>
    </>
  );
};
