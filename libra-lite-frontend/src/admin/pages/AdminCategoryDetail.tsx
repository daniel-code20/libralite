import { useQuery, gql } from '@apollo/client';
import { CircularProgress } from '@nextui-org/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminBookList from '../components/AdminBookList';
import AdminLogo from '../components/AdminLogo';
import AdminBookModal from '../../Modal/AdminBookModal';

interface Genders {
  id: string;
  name: string;
  image: { url: string };
  books: {
    id: string;
    title: string;
    image: { url: string };
    author: { name: string };
    price: number;
    gender: { id: string, name: string };
  }[];
}

interface Review {
  id: string;
  rating: number;
  book: { id: string };
}

const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    reviews {
      rating
      book {
        id
      }
    }
  }
`;

const GET_ALL_GENDERS = gql`
  query Genders($id: ID!) {
    genders(where: { id: { equals: $id } }) {
      id
      name
      image {
        url
      }
      books {
        id
        title
        image {
          url
        }
        author {
          name
        }
        price
        gender {
          id
          name
        }
      }
    }
  }
`;

export const AdminCategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ALL_GENDERS, {
    variables: { id },
  });
  const {
    loading: reviewsLoading,
    error: reviewsError,
    data: reviewsData,
  } = useQuery(GET_ALL_REVIEWS);

  if (loading || reviewsLoading) return <CircularProgress label="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;
  if (reviewsError) return <p>Error: {reviewsError.message}</p>;

  // Asegúrate de que data.genders y data.genders[0] existen antes de acceder a ellos
  if (!data || !data.genders || data.genders.length === 0) {
    return <p>No data available for this gender.</p>;
  }

  const gender: Genders = data.genders[0];
  const getRatingForBook = (bookId: string) => {
    const review = reviewsData.reviews.find(
      (review: Review) => review.book.id === bookId
    );
    return review ? review.rating : null;
  };

  const bookIds = gender.books.map(book => book.id);

  console.log(gender.id);

  return (
    <>
      <AdminLogo />
      <div className="h-screen bg-rgb-25-25-25 flex flex-col items-center justify-start text-white py-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{gender.name}</h1>
        <div className="flex justify-between items-center mb-6">
          <AdminBookModal selectedGenre={gender.id} />
        
        </div>
        <AdminBookList
          books={gender.books}
          getRatingForBook={getRatingForBook}
        />
      </div>
    </>
  );
};
