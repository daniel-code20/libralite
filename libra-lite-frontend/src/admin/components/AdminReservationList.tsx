import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AdminLogo from './AdminLogo';


interface Reservation {
    user: { email: string, name: string };
    sucursal: { name: string };
    reservationDate: string;
    book: { title: string | null };
}

const GET_ALL_RESERVATION = gql`
   query Reservations {
    reservations{
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

export const AdminReservationList: React.FC = () => {


    const { data, loading, error } = useQuery<{ reservations: Reservation[] }>(GET_ALL_RESERVATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <AdminLogo />
            <div className="flex flex-col items-center justify-center min-h-screen animate__animated animate__fadeIn">
                <div className="px-8 w-full max-w-[1200px]">
                    <h1 className="text-2xl font-bold text-white mb-6">Reservaciones</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 text-white">
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
            </div>
        </>
    );
};
