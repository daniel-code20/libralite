import { Button, Card, CardBody, CardFooter } from '@nextui-org/react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import AdminCategoryModal from '../../Modal/AdminCategoryModal';
import AdminEditCategoryModal from '../../Modal/AdminEditCategoryModal';

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

export const AdminCategoryCard = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 style={{ color: 'white' }}>Categorías</h1>
      <AdminCategoryModal />
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {data.categories.map((item: Category) => (
          <Card
            key={item.id}  // Asegúrate de agregar la propiedad key aquí
            shadow="sm"
            isPressable
            onPress={() => console.log('item pressed')}
          >
            <CardBody className="overflow-visible p-0">
              <Link to={`/admin-category/${item.id}`}>
                {/* <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.image.url}
                /> */}
              </Link>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name ? item.name : 'No Category'}</b>
              <AdminEditCategoryModal />
              <Button color="danger" variant="light" radius="sm">
                Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
