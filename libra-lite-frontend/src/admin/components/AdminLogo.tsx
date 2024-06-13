import React from 'react';
import logoImg from '../../assets/Logo1.png';
import { Link } from 'react-router-dom';
const AdminLogo = () => {
  return (
    
    <div className="flex items-center justify-start h-12 text-white">
      <img src={logoImg} alt="Logo" className="h-8 ml-6" />
      <Link to={'/admin-principal'}>
      <h1 className="font-bold bg-gradient-to-tr from-blue-500 to-cyan-400 text-transparent bg-clip-text loading-noreal ml-2">LibraLite</h1>
      </Link>
    </div>
    
  );
};

export default AdminLogo;