import React from 'react';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-blue-100">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;