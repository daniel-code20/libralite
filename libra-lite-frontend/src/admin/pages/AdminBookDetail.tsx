import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Button, Image } from '@nextui-org/react';
import estrella from '../../assets/estrella (1).png';
import AdminLogo from '../components/AdminLogo';

const GET_BOOK_DETAILS = gql`
  query Books($id: ID!) {
    books(where: { id: { equals: $id } }) {
      id
      title
      author {
        name
      }
      image {
        url
      }
      price
      quantity
      description
      gender {
        name
      }
    }
  }
`;

const GET_ALL_REVIEWS = gql`
  query Reviews {
    reviews {
      rating
      book {
        id
      }
    }
  }
`;

export const AdminBookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams<{ id: string }>();
  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(GET_BOOK_DETAILS, {
    variables: { id },
  });
  const {
    loading: reviewsLoading,
    error: reviewsError,
    data: reviewsData,
  } = useQuery(GET_ALL_REVIEWS);

  useEffect(() => {
    if (booksData && booksData.books.length > 0) {
      const selectedBook = {
        id: booksData.books[0].id,
        title: booksData.books[0].title,
        price: booksData.books[0].price,
        description: booksData.books[0].description,
        gender: booksData.books[0].gender.name,
        quantity,
      };
      localStorage.setItem('selectedBook', JSON.stringify(selectedBook));
      const totalPrice = booksData.books[0].price * quantity;
      setTotal(totalPrice);
    }
  }, [quantity, booksData]);

  useEffect(() => {
    const savedBook = localStorage.getItem('selectedBook');
    if (savedBook) {
      const parsedBook = JSON.parse(savedBook);
      setQuantity(parsedBook.quantity);
      setTotal(parsedBook.price * parsedBook.quantity);
    }
  }, []);

  if (booksLoading || reviewsLoading) return <p>Loading...</p>;
  if (booksError) return <p>Error: {booksError.message}</p>;
  if (reviewsError) return <p>Error: {reviewsError.message}</p>;

  const book = booksData.books[0];

  const getRatingForBook = () => {
    const review = reviewsData.reviews.find(
      (review: { rating: number; book: { id: string } }) =>
        review.book.id === book.id
    );
    return review ? review.rating : null;
  };

  return (
    <>
      <AdminLogo />
      <div className="min-h-screen flex items-center justify-center text-white animate__animated animate__fadeIn">
        {book && (
          <div className="flex flex-row items-start space-x-6">
            <Image
              src={book.image.url}
              alt={book.title}
              width={300}
              height={200}
              radius="sm"
            />
            <div>
              <div className="flex items-center space-x-6">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <div className="flex items-center space-x-1">
                  <img
                    alt="star"
                    src={estrella}
                    style={{ width: '12px', height: '12px' }}
                  />
                  <span className="text-xs font-regular text-sky-400/100 line-clamp-1">
                    {getRatingForBook()} / 5
                  </span>
                </div>
              </div>

              <h2 className="text-l mb-2 font-regular text-gray-300">
                by {book.author?.name || 'Autor desconocido'}
              </h2>

              <div className="max-w-md">
                {' '}
                {/* Nuevo div para limitar el ancho */}
                <p className="text-md mb-2 font-regular text-gray-500">
                  {book.description}
                </p>
              </div>
              <div className="flex items-start space-x-1">
                <p className="text-md mb-4 font-semibold text-gray-300">
                  Género:
                </p>
                <p className="text-md mb-4 font-regular text-gray-400">
                  {book.gender.name}
                </p>
              </div>

              <div className="flex items-start space-x-1">
                <p className="text-lg mb-4 font-semibold text-gray-300">
                  Disponibles:
                </p>
                <p className="text-lg mb-4 font-regular text-gray-400">
                  {book.quantity} Unidades
                </p>
              </div>

              <div className="flex items-start space-x-1">
                <p className="text-lg mb-4 font-semibold text-gray-300">
                  Precio:
                </p>
                <p className="text-lg mb-4 font-regular text-gray-400">
                  ${book.price.toFixed(2)}
                </p>
              </div>

              <Button color="primary" radius="sm" variant="shadow">
                Editar
              </Button>
              <Button
                color="danger"
                radius="sm"
                variant="flat"
                className="ml-4"
              >
                Eliminar
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
