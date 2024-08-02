import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import SideBar from './SideBar';
import { FaBars, FaTimes } from 'react-icons/fa';

interface Reservation {
    user: { email: string, name: string };
    sucursal: { name: string };
    reservationDate: string;
    book: { title: string | null };
}

const GET_ALL_RESERVATION = gql`
   query Reservations($userId: ID!) {
    reservations(where: { user: { id: { equals: $userId } } }) {
       user {
          id
          email
          name
        }
        book {
          id
          title
        }
        sucursal {
          name
        }
        cantidad
        reservationDate
    }
  }
`;

export const ReservationList: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    const { data, loading, error } = useQuery<{ reservations: Reservation[] }>(GET_ALL_RESERVATION, {
        variables: { userId }
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
                    <h1 className="text-2xl font-bold ml-4">Reservaciones</h1>
                </header>
                <main className="flex-grow p-4 overflow-y-auto">
                    <div className="w-full max-w-[1200px] mx-auto bg-white rounded-md shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-700">Cliente</th>
                                        <th className="py-2 px-4 border-b border-gray-700">Sucursal</th>
                                        <th className="py-2 px-4 border-b border-gray-700">Fecha de compra</th>
                                        <th className="py-2 px-4 border-b border-gray-700">Libro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.reservations.map((reservation: Reservation, index: number) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b border-gray-700">{reservation.user.name} ({reservation.user.email})</td>
                                            <td className="py-2 px-4 border-b border-gray-700">{reservation.sucursal.name}</td>
                                            <td className="py-2 px-4 border-b border-gray-700">{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b border-gray-700">{reservation.book ? reservation.book.title : 'No Title'}</td>
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
