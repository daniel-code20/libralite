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
import React, { useState } from 'react';

interface Genders {
  id: string;
  name: string;
  image: { id: string; url: string };
}

const GET_ALL_BOOKS = gql`
  query Genders {
    genders {
      id
      name
      image {
        id
        url
      }
    }
  }
`;

export const CategoryCard = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOOKS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen animate__animated animate__fadeIn">
        <div className="px-8 w-full max-w-[1200px]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Géneros</h1>

          </div>
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
            {data.genders.map((item: Genders) => (
              <Card
                className="max-w-[400px] bg-zinc-800 shadow-xl mb-6"
                key={item.id}
              >
                <Link to={`/category/${item.id}`}>
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
