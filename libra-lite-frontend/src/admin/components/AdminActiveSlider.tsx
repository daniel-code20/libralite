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
    <div className="flex items-start justify-center mb-8 animate__animated animate__fadeIn shadow-md bg-white rounded-md overflow-hidden max-w-full">
      <div className="w-full px-4">
        <h2 className="text-2xl font-bold mb-4 text-black mt-4">Populares</h2>
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
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1280: {
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
          className="py-4"
          style={{ height: 'auto' }}
        >
          {filteredBooks.map((book: Book) => (
            <SwiperSlide key={book.id}>
              <Link to={`/admin-book/${book.id}`}>
                <Image
                  className="w-full object-cover rounded-md"
                  alt={book.title}
                  src={book.image.url}
                  style={{ height: '200px' }} // Ajusta la altura según sea necesario
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};