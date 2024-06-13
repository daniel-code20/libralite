import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  Image,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import React from 'react';
import estrella from '../../assets/estrella (1).png';

interface Book {
  id: string;
  title: string;
  author: { name: string };
  image: { id: string; url: string };
  price: number;
}

interface Review {
  id: string;
  rating: number;
  book: { title: string; id: string };
}

const GET_ALL_BOOKS = gql`
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

const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    reviews {
      rating
      book {
        id
      }
    }
  }
`;

export const AdminActiveSlider = () => {
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(GET_ALL_BOOKS);
  const { loading: reviewsLoading, error: reviewsError, data: reviewsData } = useQuery(GET_ALL_REVIEWS);
  const [searchTerm] = useState('');

  if (booksLoading || reviewsLoading) return <CircularProgress label="Loading..." />;
  if (booksError) return <p>Error: {booksError.message}</p>;
  if (reviewsError) return <p>Error: {reviewsError.message}</p>;

  const filteredBooks = booksData.books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingForBook = (bookId: string) => {
    const review = reviewsData.reviews.find((review: Review) => review.book.id === bookId);
    return review ? review.rating : null;
  };

  return (
    <div className="flex items-start justify-center mb-16 animate__animated animate__fadeIn">
      <div style={{ padding: '16px', width: 'calc(100% - 80px)' }}>
        <h2 className="text-2xl font-bold mb-6 text-white">Recomendados</h2>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            clickableClass: 'swiper-pagination-clickable',
            bulletClass: 'swiper-pagination-bullet',
          }}
          modules={[FreeMode, Pagination]}
        >
          {filteredBooks.map((book: Book) => (
            <SwiperSlide key={book.id}>
              <Link to={`/admin-book/${book.id}`}>
                <Card className="bg-zinc-800 shadow-xl mb-10 flex-row" radius="sm">
                  <CardBody>
                    <Image
                      className="w-full object-cover h-[140px]"
                      radius="md"
                      alt={book.title}
                      src={book.image.url}
                    />
                  </CardBody>
                  <CardFooter className="text-small flex flex-col items-start ml-0">
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
                        <img alt="star" src={estrella} style={{ width: '12px', height: '12px' }} />
                        <span className="text-xs font-regular text-sky-400/100 line-clamp-1">
                          {getRatingForBook(book.id)} / 5
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};