import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { ListboxWrapper } from './ListboxWrapper';
import { Link } from 'react-router-dom';

const SEARCH_BOOKS = gql`
  query Books($where: BookWhereInput!) {
    books(where: $where) {
      id
      title
      author {
        name
      }
    }
  }
`;

interface SearchResultProps {
  searchTerm: string;
}

interface Book {
  id: string;
  title: string;
}

export const SearchResult: React.FC<SearchResultProps> = ({ searchTerm }) => {
  const { loading, error, data } = useQuery(SEARCH_BOOKS, {
    variables: {
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { author: { name: { contains: searchTerm } } },
        ],
      },
    },
  });

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.books || !Array.isArray(data.books)) return null;

  return (
    <ListboxWrapper>
      <Listbox aria-label="Search Results">
        {data.books.map((book: Book) => (
          <ListboxItem key={book.id}>
            <Link
              to={`/book/${book.id}`}
              onClick={() => setSelectedBookId(book.id)}
            >
              {book.title}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};
