import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import estrella from '../assets/estrella (1).png';

interface Book {
  id: string;
  title: string;
  author: { name: string };
  image: { url: string };
  price: number;
  description: string; // Añadido para el ejemplo
}

interface BookListProps {
  books: Book[];
  getRatingForBook: (bookId: string) => number | null;
}

const BookList: React.FC<BookListProps> = ({ books, getRatingForBook }) => {
  return (
    <div >
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`}>
              <Card className="max-w-[340px] bg-white shadow-xl flex flex-col lg:flex-row" radius="sm">
                <CardBody className=" flex justify-center items-center lg:w-1/3 lg:items-start lg:pr-4">
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
                    <p className="text-xs font-regular text-gray-600">
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
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center">No hay libros disponibles en este género.</p>
      )}
    </div>
  );
};

export default BookList;
