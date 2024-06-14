import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Button } from '@nextui-org/react';
import iconGoogle from '../assets/google-icon.png'

const GoogleLoginButton: React.FC = () => {
    const clientId = '760222018286-m4b2mkvbko67rhj3457a7pfse5f2fhtl.apps.googleusercontent.com';

  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('profileObj' in response) {
      console.log('Login Success:', response);
      // Maneja el éxito del login aquí
    } else {
      console.log('Login Success (offline):', response);
      // Maneja el éxito del login en modo offline aquí
    }
  };

  const handleFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('Login Failed:', response);
      // Maneja el fallo del login aquí
    };
  
    return (
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <Button
            className="max-w-lg btn-google"
            radius='sm'
            type="submit"
            style={{ height: '50px' }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant='bordered'
          >
            <img src={iconGoogle} alt="icon" />
            Iniciar con Google
          </Button>
        )}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    );
  };
  
  export default GoogleLoginButton;
  