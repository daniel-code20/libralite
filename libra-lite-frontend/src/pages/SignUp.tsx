import Form, { FormItem, FormValidations } from 'reactivity-hook-form';
import Lottie from 'lottie-react';
import animationData from '../assets/sign-up.json';
import { Link, useNavigate } from 'react-router-dom';
import { CREATE_USER_MUTATION } from '../auth/authMutation';
import React, { useState } from 'react';
import client from '../main';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from '../components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../components/EyeSlashFilledIcon';
import { Button } from '@nextui-org/button';
import logoImg from '../assets/Logo1.png';
import '../styles/signUp.css';

const SignUp = () => {
  type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const validations: FormValidations<FormValues> = {
    name: {
      required: 'El nombre es requerido',
    },
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
    confirmPassword: {
      required: 'Debes confirmar la contraseña',
      validate(value, values) {
        if (value !== values.password) {
          return 'Las contraseñas no coinciden';
        }
      },
    },
  };

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (data: FormValues) => {
    const { name, email, password } = data;
    try {
      await client.mutate({
        mutation: CREATE_USER_MUTATION, // Usa la consulta importada
        variables: { name, email, password },
      });
      navigate('/login');
    } catch (error) {
      setError('Error al crear la cuenta');
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="crear-cuenta-container animate__animated animate__fadeIn" style={{overflowY: 'auto'}}>
      <div className="crear-cuenta-form">
        <div className="icon-container">
          <img src={logoImg} alt="logo" className="logo-image" />
          <h3 className="font-bold h3-signup">LibraLite</h3>
        </div>
        <div className="h1-container">
            <h1 style={{ color: 'white' }} className="text-2xl font-bold h1-signup">Crear Cuenta</h1>
          </div>
          <p className="p-bienvenida">
            Crea una cuenta para ver nuestro stock disponible y disfruta de los
            mejores libros
          </p>
        <div className="form-group">
          <Form<FormValues> onSubmit={handleSignUp} validations={validations}>
            <FormItem<FormValues> name="name">
              <Input
                type="text"
                label="Nombre"
                variant="bordered"
                radius="sm"
                className="max-w-lg input-color"
              />
            </FormItem>
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
                radius="sm"
                placeholder="Ingresa tu contraseña"
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
            <FormItem<FormValues> name="confirmPassword">
              <Input
                label="Confirma tu contraseña"
                variant="bordered"
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
            {error && <p>{error}</p>}
            <Button
              radius="sm"
              className="max-w-lg bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg"
              type="submit"
              style={{ height: '50px' }}
            >
              Crear Cuenta
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
              Crear cuenta con Google
            </Button>
          </Form>
        </div>
        <p className="p-iniciar-sesion">
          <span className="span-create-account">¿Ya tienes una cuenta?</span>
          <Link to="/login">Iniciar Sesión</Link>
        </p>
      </div>
      <div className="imagen-container">
        <Lottie animationData={animationData} style={{ width: '70%' }} />
      </div>
    </div>
  );
};

export default SignUp;
