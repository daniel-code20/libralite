import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import '../styles/BookSlider.css';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';

interface Book {
  id: string;
  title: string;
  price: number;
  author: { name: string };
  image: { id: string; url: string };
}

const GET_BOOKS = gql`
  query GetAllBooks {
    books {
      id
      title
      price
      author {
        name
      }
      image {
        id
        url
      }
    }
  }
`;

const BookSlider: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [currentIndex] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="book-slider">
      <div className="slider-content">
        {data.books.map((book: Book, index: number) => (
          <div
            key={book.id}
            className={`book-card ${index === currentIndex ? 'active' : ''}`}
          >
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{book.title}</h4>
                <p className="text-tiny uppercase font-bold">
                  {book.author.name}
                </p>
                <small className="text-default-500">${book.price}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  isBlurred
                  isZoomed
                  alt={book.title}
                  className="m-5"
                  src={book.image.url}
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSlider;
