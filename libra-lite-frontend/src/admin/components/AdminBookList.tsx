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
    <>
      <div className="flex flex-col items-center justify-center min-h-screen animate__animated animate__fadeIn">
        <div className="px-8 w-full max-w-[1200px]">
          {books.length > 0 ? (
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
              {books.map((book, index) => (
                <Card className="bg-zinc-800 shadow-xl relative flex flex-col" radius="sm" key={index}>
                  <Link to={`/admin-book/${book.id}`}>
                    <Divider />
                    <CardBody className="flex flex-row">
                      <Image className="w-full object-cover h-[140px]" radius="md" alt={book.title} src={book.image.url} />
                      <div className="w-2/3 pl-4">
                        <h4 className="font-bold text-base text-white line-clamp-2 mb-2">{book.title}</h4>
                        <h4 className="text-xs font-regular text-gray-300 line-clamp-2 mb-2">
                          {book.author?.name || 'Autor desconocido'}
                        </h4>
                        <div className="flex items-center space-x-6">
                          <small className="text-sm font-bold text-sky-400/100">${book.price}</small>
                          <div className="flex items-center space-x-1">
                            <img alt="star" src={estrella} style={{ width: '12px', height: '12px' }} />
                            <span className="text-xs font-regular text-sky-400/100 line-clamp-1">
                              {getRatingForBook(book.id)} / 5
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Link>
                  <Divider />
                  <CardFooter>
                    <AdminEditBookModal selectedGenre={gender.id} bookId={book.id} />
                    <DeleteBookButton BookId={book.id} />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-400 mt-8">No hay libros para mostrar.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBookList;
