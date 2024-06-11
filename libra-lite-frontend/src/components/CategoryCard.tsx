import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
}

const GET_ALL_BOOKS = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export const CategoryCard = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 style={{ color: 'white' }}>Categorías</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {data.categories.map((item: Category) => (
          <Link to={`/category/${item.id}`} key={item.id}>
            <Card
              shadow="sm"
              isPressable
              onPress={() => console.log('item pressed')}
            >
              <CardBody className="overflow-visible p-0">
                {/* <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.image.url}
                /> */}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.name ? item.name : 'No Category'}</b>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};
