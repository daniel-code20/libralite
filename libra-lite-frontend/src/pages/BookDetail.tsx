import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Button, Image } from '@nextui-org/react';
import estrella from '../assets/estrella (1).png';
import Logo from '../components/Logo';


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
      gender
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

export const BookDetail = () => {
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
        gender: booksData.books[0].gender,
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

  const incrementQuantity = () => {
    if (quantity < book.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
    <Logo/>
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
                by {book.author.name}
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
                  {book.gender}
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

              <div className="flex items-center mb-4">
                <Button
                  radius="sm"
                  color="primary"
                  variant="light"
                  onClick={decrementQuantity}
                >
                  -
                </Button>
                <span className="mx-4 text-lg">{quantity}</span>
                <Button
                  radius="sm"
                  color="primary"
                  variant="light"
                  onClick={incrementQuantity}
                >
                  +
                </Button>
              </div>
              <div className="flex items-start space-x-1">
                <p className="text-lg mb-4 font-semibold text-gray-300">
                  Total:
                </p>
                <p className="text-lg mb-4 font-regular text-gray-400">
                  ${total.toFixed(2)}
                </p>
              </div>

              <Button
                  color="primary"
                  radius="sm"
                  variant="ghost"
       
                >
                  <Link
                    to={`/reservation/${book.id}`}
                    key={`reservation-${book.id}`}
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Reservar
                  </Link>
                </Button>
                <Button
                className='ml-6'
                  color="primary"
                  radius="sm"
                  variant="shadow"
                 
                >
                  <Link
                    to={`/buy/${book.id}`}
                    key={`buy-${book.id}`}
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Comprar
                  </Link>
                </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
