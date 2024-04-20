import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookSlider from './BookSlider';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '../components/SearchIcon';
import '../styles/Dashboard.css';

interface Book {
  id: string;
  title: string;
  author: { name: string };
  image: { id: string; url: string };
}

const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    books {
      id
      title
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

const BookList = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <Input
          label="Search"
          isClearable
          size='sm'
          radius="sm"
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-transparent',
              'text-black/90 dark:text-white/90',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60',
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'shadow-xl',
              'bg-default-200/50',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focused=true]:bg-default-200/50',
              'dark:group-data-[focused=true]:bg-default/60',
              '!cursor-text',
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {searchTerm && (
          <ul>
            {filteredBooks.map((book: Book) => {
              console.log(book.image.url); // Log the image URL to the console
              return (
                <li key={book.id}>
                  <img src={book.image.url} alt={book.title} />
                  <strong>{book.title}</strong> by {book.author.name}
                </li>
              );
            })}
          </ul>
        )}
        <BookSlider />
      </div>
    </>
  );
};

export default BookList;
