import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, CardBody, CircularProgress, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: { name: string };
  image: { id: string; url: string };
  price: number;
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

export const AdminActiveSlider = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const [searchTerm] = useState('');

  if (loading) return <CircularProgress label="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex items-start justify-center h-screen">
      <div
        style={{ padding: '40px', width: 'calc(100% - 80px)', height: '100px' }}
      >
        <div
          className="circlePosition w-[590px] h-[200px] bg-gradient-to-r from-pink-500 to-violet-600 rounded-[100%] absolute z-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"
          style={{ opacity: 0.5 }}
        />
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Recomendados</h2>
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            800: {
              slidesPerView: 4,
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
                <Card className="bg-white/30" style={{ marginBottom: '40px' }}>
                  <CardBody style={{ flexDirection: 'row' }}>
                    <Image
                      isBlurred
                      alt={book.title}
                      className="mr-4"
                      src={book.image.url}
                      style={{ width: '150px', height: '200px' }}
                    />
                    <div>
                      <h4
                        className="font-bold text-large"
                        style={{ color: 'white' }}
                      >
                        {book.title}
                      </h4>
                      <p
                        className="text-tiny uppercase font-bold"
                        style={{ color: 'white' }}
                      >
                        {book.author.name}
                      </p>
                      <small
                        className="text-default-500"
                        style={{ color: 'white' }}
                      >
                        ${book.price}
                      </small>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
