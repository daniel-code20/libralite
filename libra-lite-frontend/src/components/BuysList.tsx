import React from 'react';
import { useQuery, gql } from '@apollo/client';


interface Buy {
    cliente: { email: string, name: string };
    direccionEnvio: string;
    fechaCompra: string;
    libro: { title: string | null };
}

const GET_ALL_BUYS = gql`
   query Buys($clientId: ID!) {
    buys(where: { cliente: { id: { equals: $clientId } } }) {
      cliente {
        id
        email
        name
      }
      direccionEnvio
      fechaCompra
      libro {
        id
        title
      }
    }
  }
`;

export const BuysList: React.FC = () => {

    const clientId  = localStorage.getItem('userId');

    const { data, loading, error } = useQuery<{ buys: Buy[] }>(GET_ALL_BUYS, {
        variables: {clientId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen animate__animated animate__fadeIn">
            <div className="px-8 w-full max-w-[1200px]">
                <h1 className="text-2xl font-bold text-white mb-6">Compras</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 text-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-700">Cliente</th>
                                <th className="py-2 px-4 border-b border-gray-700">Dirección</th>
                                <th className="py-2 px-4 border-b border-gray-700">Fecha de compra</th>
                                <th className="py-2 px-4 border-b border-gray-700">Libro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.buys.map((buy: Buy, index: number) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b border-gray-700">{buy.cliente.name} ({buy.cliente.email})</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{buy.direccionEnvio}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{new Date(buy.fechaCompra).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{buy.libro ? buy.libro.title : 'No Title'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
