import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: { name: string };
  image: { url: string };
  price: number;
}

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
    }
  }
`;
export const ReservationPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book: Book = data.books[0];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-2">Reservation Page</h1>
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <img
        src={book.image.url}
        alt={book.title}
        className="w-64 h-64 object-cover"
      />
      <h2 className="text-xl mb-2">by {book.author.name}</h2>
      <p className="text-lg mb-4">${book.price}</p>
    </div>
  );
};
