import { useQuery, gql } from '@apollo/client';
import { CircularProgress } from '@nextui-org/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminBookList from '../components/AdminBookList';

import { AdminSearchBar } from '../components/AdminSearchBar';
import AdminLogo from '../components/AdminLogo';

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

  const gender: Genders = data.genders[0];
  const getRatingForBook = (bookId: string) => {
    const review = reviewsData.reviews.find(
      (review: Review) => review.book.id === bookId
    );
    return review ? review.rating : null;
  };

  return (
    <>
      <AdminLogo />
      <AdminSearchBar />
      <div className="h-screen bg-rgb-25-25-25 flex flex-col items-center justify-start text-white py-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{gender.name}</h1>
        <AdminBookList books={gender.books} getRatingForBook={getRatingForBook} />
      </div>
    </>
  );
};
