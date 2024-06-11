import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
// import { PaymentForm } from '../forms/PaymentForm';

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
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-2">Buy Page</h1>
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <img
        src={book.image.url}
        alt={book.title}
        className="w-64 h-64 object-cover"
      />
      <h2 className="text-xl mb-2">by {book.author.name}</h2>
      <p className="text-lg mb-4 text-white">${book.price}</p>
      <p className="text-lg mb-4 text-white">Cantidad: {book.quantity}</p>
      <p className="text-lg mb-4 text-white">Unidades a comprar: {selectedQuantity}</p>
      <p className="text-lg mb-4 text-white">Total: ${total.toFixed(2)}</p>
      <Button color='primary'>Comprar</Button>
      {/* <PaymentForm/> */}
    </div>
  );
};
