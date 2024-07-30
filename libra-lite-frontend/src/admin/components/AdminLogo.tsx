import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/Logo1.png';
import { Link } from 'react-router-dom';
import { AdminSearchBar } from './AdminSearchBar';
import { logoutUser } from '../../auth/authUser';
import { Button } from '@nextui-org/button';
const AdminLogo = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between h-16 px-6 text-white">
      <div className="flex items-center">
        <img src={logoImg} alt="Logo" className="h-8" />
        <Link to={'/admin-principal'}>
          <h1 className="font-bold bg-gradient-to-tr from-blue-500 to-cyan-400 text-transparent bg-clip-text loading-noreal ml-2">
            LibraLite
          </h1>
        </Link>
      </div>
      <Link to={'/admin-buyslist'}>
      <h1>Compras</h1>
      </Link>
      <Link to={'/admin-reservationlist'}>
      <h1>Reservaciones</h1>
      </Link>
      <AdminSearchBar />
      <Button
        onClick={handleLogout}
        className="bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-lg"
        radius="sm"
      >
        Cerrar sesión
      </Button>
      
    </div>
)};

export default AdminLogo;