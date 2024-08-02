import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import SideBar from './SideBar';
import { FaBars, FaTimes } from 'react-icons/fa';

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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const clientId = localStorage.getItem('userId');

    const { data, loading, error } = useQuery<{ buys: Buy[] }>(GET_ALL_BUYS, {
        variables: { clientId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className={`flex-grow flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-0'} lg:ml-60`}>
                <header className="bg-white shadow-md flex items-center p-4">
                    {/* Botón de hamburguesa para móviles */}
                    <button
                        className="lg:hidden p-2 text-black"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? (
                            <FaTimes className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </button>
                    <h1 className="text-2xl font-bold ml-4">Compras</h1>
                </header>
                <main className="flex-grow p-4 overflow-auto">
                    <div className="w-full max-w-[1200px] mx-auto bg-white rounded-md shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-700 text-black">Cliente</th>
                                        <th className="py-2 px-4 border-b border-gray-700 text-black">Dirección</th>
                                        <th className="py-2 px-4 border-b border-gray-700 text-black">Fecha de compra</th>
                                        <th className="py-2 px-4 border-b border-gray-700 text-black">Libro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.buys.map((buy: Buy, index: number) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b border-gray-700 text-black">{buy.cliente.name} ({buy.cliente.email})</td>
                                            <td className="py-2 px-4 border-b border-gray-700 text-black">{buy.direccionEnvio}</td>
                                            <td className="py-2 px-4 border-b border-gray-700 text-black">{new Date(buy.fechaCompra).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b border-gray-700 text-black">{buy.libro ? buy.libro.title : 'No Title'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
