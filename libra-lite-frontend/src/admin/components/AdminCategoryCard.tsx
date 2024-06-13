import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from '@nextui-org/react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import React from 'react';

interface Category {
  id: string;
  name: string;
  image: { id: string; url: string };
}

const GET_ALL_BOOKS = gql`
  query Categories {
    categories {
      id
      name
      image {
        id
        url
      }
    }
  }
`;

export const AdminCategoryCard = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen animate__animated animate__fadeIn">
        <div className="px-8 w-full max-w-[1200px]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Categorías</h1>
            <Button color="success" radius="sm" variant="shadow">
              Añadir Categoría
            </Button>
          </div>
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
            {data.categories.map((item: Category) => (
              <Card
                className="max-w-[400px] bg-zinc-800 shadow-xl mb-6"
                key={item.id}
              >
                <Link to={`/admin-category/${item.id}`}>
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="category image"
                      height={40}
                      radius="sm"
                      src={item.image.url ? item.image.url : 'No image'}
                      width={40}
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-lg text-white line-clamp-2">
                        {item.name ? item.name : 'No Category'}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p className="text-lg text-white">
                      Make beautiful websites regardless of your design
                      experience.
                    </p>
                  </CardBody>
                </Link>
                <Divider />
                <CardFooter>
                  <Button color="primary" radius="sm" variant="solid">
                    Editar
                  </Button>
                  <Button
                    color="danger"
                    className="ml-4"
                    radius="sm"
                    variant="bordered"
                  >
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
