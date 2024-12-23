import { useState } from 'react';
import Login from './auth/Login';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import Register from './auth/Register';

const Modal = () => {

  const [isRegister, setIsRegister] = useState(false)

  const openRegister = () => {
    setIsRegister(true)
  }
  const openLogin = () => {
    setIsRegister(false)
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className='bg-[#faf7f0] px-10'>
        <DialogHeader>
          {isRegister ? <DialogTitle className='text-center'>Créer un compte</DialogTitle> :
          <DialogTitle className='text-center'>Connection</DialogTitle>}
        </DialogHeader>
        {isRegister ? (
          <Register/>
        ) : (
          <Login />
        )}
        <DialogDescription className='space-y-4'>            
          <p className='text-center font-semibold'>ou</p>
          {isRegister ? (
            <Button 
            variant="outline"
            className='rounded-xl w-full'
            onClick={openLogin}
            >J'ai déjà un compte</Button>
          ):(
            <Button 
            variant="outline"
            className='rounded-xl w-full'
            onClick={openRegister}
            >Créer un compte</Button>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
