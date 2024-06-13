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
}

interface BookListProps {
  books: Book[];
  getRatingForBook: (bookId: string) => number | null;
}

const BookList: React.FC<BookListProps> = ({ books, getRatingForBook }) => {
  return (
    <>
    
      <div className="flex items-start justify-center animate__animated animate__fadeIn">
        
        <div
          style={{
            padding: '16px',
            width: 'calc(100% - 80px)',
            height: '600px',
          }}
        >
            
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {books.map((book, index) => (
                <Link key={index} to={`/book/${book.id}`}>
                  <Card
                    className="bg-zinc-800 shadow-xl relative flex-row"
                    radius="sm"
                  >
                    <CardBody>
                      <Image
                        className="w-full object-cover h-[140px]"
                        radius="md"
                        alt={book.title}
                        src={book.image.url}
                      />
                    </CardBody>
                    <CardFooter className="text-small flex flex-col items-start">
                      <h4 className="font-bold text-base text-white line-clamp-2 mb-2">
                        {book.title}
                      </h4>
                      <h4 className="text-xs font-regular text-gray-300 line-clamp-2 mb-2">
                        {book.author.name}
                      </h4>
                      <div className="flex items-center space-x-6">
                        <small className="text-sm font-bold text-sky-400/100">
                          ${book.price}
                        </small>
                        <div className="flex items-center space-x-1">
                          <img
                            alt="star"
                            src={estrella}
                            style={{ width: '12px', height: '12px' }}
                          />
                          <span className="text-xs font-regular text-sky-400/100 line-clamp-1">
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
            <p>No hay libros disponibles en esta categoría.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookList;
