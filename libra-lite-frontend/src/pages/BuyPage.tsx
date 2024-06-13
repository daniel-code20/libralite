import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import React from 'react';
import { PaymentForm } from '../forms/PaymentForm';
import { Button } from '@nextui-org/button';
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
    }
  }
`;

export const BuyPage = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id },
  });

  useEffect(() => {
    const selectedBook = localStorage.getItem('selectedBook');
    if (selectedBook) {
      const parsedSelectedBook = JSON.parse(selectedBook);
      setSelectedQuantity(parsedSelectedBook.quantity);
    }
  }, []);

  useEffect(() => {
    if (data && data.books.length > 0) {
      const totalPrice = data.books[0].price * selectedQuantity;
      setTotal(totalPrice);
    }
  }, [selectedQuantity, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data.books[0];

  const handleSubmit = () => {
    console.log('Submit desde BuyPage');
  };

  return (
    <>
      <Logo />
      <div className="min-h-screen flex flex-col items-center justify-center text-white ">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <PaymentForm onSubmit={handleSubmit}>
          <div className="flex items-start space-x-1">
            <p className="text-lg mb-2 font-bold text-gray-300">
              Total de unidades:
            </p>
            <p className="text-lg mb-2 font-semibold text-gray-400">
              {selectedQuantity}
            </p>
          </div>
          <Button
            type="submit"
            radius="sm"
            className="w-full  bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-lg"
            style={{ height: '50px' }}
          >
            Pagar ${total.toFixed(2)}
          </Button>
        </PaymentForm>
      </div>
    </>
  );
};
