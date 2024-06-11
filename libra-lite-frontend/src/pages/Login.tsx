import React, { useState } from 'react';
import Form, { FormItem, FormValidations } from 'reactivity-hook-form';
import { Link } from 'react-router-dom';
import { authenticateUser, UserRoles } from '../auth/authUser';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/read-animation-2.json';
import logoImg from '../assets/Logo1.png';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from '../components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../components/EyeSlashFilledIcon';
import { Button } from '@nextui-org/button';
import '../styles/Login.css';

export const Login = () => {
  type FormValues = {
    email: string;
    password: string;
  };

  const validations: FormValidations<FormValues> = {
    email: {
      required: 'El email es requerido',
    },
    password: {
      required: 'La contraseña es requerida',
      validate(value) {
        if (value.length < 8) {
          return 'La contraseña debe tener al menos 8 caracteres';
        }
      },
    },
  };

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const user = await authenticateUser(data.email, data.password);
      if (user.role === UserRoles.ADMIN) {
        navigate('/admin-principal');
      } else {
        navigate('/admin-principal');
      }
    } catch (error) {
      setError('Correo o contraseña inválidos');
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="login-container animate__animated animate__fadeIn">
        <div className="login-image">
          <Lottie animationData={animationData} style={{ width: '70%' }} />
        </div>
        <div className="login-form">
          <div className="icon-container">
            <img src={logoImg} alt="logo" className="logo-image" />
            <h3 className='font-bold bg-gradient-to-tr from-blue-500 to-cyan-400  shadow-lg text-transparent bg-clip-text loading-noreal'>LibraLite</h3>
          </div>
          <div className="h1-container">
            <h1 style={{ color: 'white' }} className="text-2xl font-bold h1-login ">¡Bienvenido a LibraLite!</h1>
          </div>
          <p className="p-bienvenida" style={{marginBottom:'20px'}}>
            Inicia Sesión para ver nuestro stock disponible y disfruta de los
            mejores libros
          </p>
          <Form<FormValues>
            onSubmit={handleLogin}
            validations={validations}
  
          >
            <FormItem<FormValues> name="email">
              <Input
                type="email"
                label="Email"
                radius="sm"
                variant="bordered"
                placeholder="example@google.com"
                className="max-w-lg input-color"
              />
            </FormItem>
            <FormItem<FormValues> name="password">
              <Input
                label="Contraseña"
                variant="bordered"
                placeholder="Ingresa tu contraseña"
                radius="sm"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                className="max-w-lg input-color"
              />
            </FormItem>
            <Button
              radius="sm"
              className="max-w-lg bg-gradient-to-tr from-blue-500 to-cyan-400  text-white shadow-lg"
              type="submit"
              style={{ height: '50px'}}
            >
              Iniciar sesión
            </Button>
            {error && <p>{error}</p>}
            <Button
              radius="sm"
              className="max-w-lg btn-google"
              variant="bordered"
              type="submit"
              style={{ height: '50px' }}
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
              Iniciar sesión con Google
            </Button>
          </Form>
          <p className="p-crear-cuenta">
            <span className="span-create-account">¿No tienes una cuenta?</span>
            <Link to="/signup" className='bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg text-transparent bg-clip-text loading-noreal'>Crear Cuenta</Link>
          </p>
        </div>
      </div>
    </>
  );
};
