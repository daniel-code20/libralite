import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';
import estrella from '../../assets/estrella (1).png';
import { Genders } from '../../graphql/types';
import { GET_ALL_GENDERS } from '../../graphql/mutation/queries';
import AdminEditBookModal from '../../Modal/AdminEditBookModal';
import DeleteBookButton from '../../graphql/DeleteBookButton';

interface Book {
  id: string;
  title: string;
  author: { name: string };
  image: { url: string };
  price: number;
  gender: { id: string, name: string }
  description: string;
}

interface BookListProps {
  books: Book[];
  getRatingForBook: (bookId: string) => number | null;
}

const AdminBookList: React.FC<BookListProps> = ({ books, getRatingForBook }) => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ALL_GENDERS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.genders || data.genders.length === 0) {
    return <p>No data available for this gender.</p>;
  }

  const gender: Genders = data.genders[0];

  return (
    <div className="animate__animated animate__fadeIn">
    
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Link key={book.id} to={`/admin-book/${book.id}`}>
              <Card className="max-w-[340px] bg-white shadow-xl flex flex-col lg:flex-row" radius="sm">
                <CardBody className="flex justify-center items-center lg:w-1/3 lg:items-start lg:pr-4">
                  <Image
                    className="object-cover w-full h-40"
                    radius="md"
                    alt={book.title}
                    src={book.image.url}
                  />
                </CardBody>
                <CardFooter className="p-4 lg:w-2/3 flex flex-col">
                  <div className="flex flex-col mb-2">
                    <h4 className="font-bold text-base text-black mb-1">
                      {book.title}
                    </h4>
                    <h5 className="text-xs font-regular text-gray-600 mb-1">
                      {book.author?.name || 'Autor desconocido'}
                    </h5>
                    <p className="text-xs font-regular text-gray-600 line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <small className="text-sm font-bold text-sky-400">
                      ${book.price}
                    </small>
                    <div className="flex items-center space-x-1">
                      <img
                        alt="star"
                        src={estrella}
                        className="w-3 h-3"
                      />
                      <span className="text-xs font-regular text-sky-400">
                        {getRatingForBook(book.id)} / 5
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <AdminEditBookModal selectedGenre={gender.id} bookId={book.id} />
                    <DeleteBookButton BookId={book.id} />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400 mt-8">No hay libros disponibles en este género.</p>
      )}
    </div>
 
  );
};

export default AdminBookList;
