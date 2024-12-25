import { useState } from 'react';
import Login from './FormLogin';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import Register from './FormRegister';
import {formSchema, UserLoginDTO, UserRegisterDTO} from '@baobbab/dtos'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useLoginMutation, useRegisterMutation } from '@/hooks/useAuthMutation';

export type FormSchemaType = z.infer<typeof formSchema>;

const Modal = () => {
  const [isRegister, setIsRegister] = useState(false)

  const {mutate: registerMutate} = useRegisterMutation()
  const {mutate: loginMutate} = useLoginMutation()

  const userRegisterDTO = ( userRegister: UserRegisterDTO) => {
    registerMutate(userRegister)
  }
  const userLoginDTO = ( userLogin: UserLoginDTO) => {
    loginMutate(userLogin)
  }

  const openRegister = () => {
    setIsRegister(true)
  }
  const openLogin = () => {
    setIsRegister(false)
  }

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  mode:'onChange',
  defaultValues: {
    username: '',
    email: '',
    password: '',
  },
});
  

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className='bg-[#faf7f0] px-10'>
        <DialogHeader>
          {isRegister ? <DialogTitle className='text-center'>Créer un compte</DialogTitle> :
          <DialogTitle className='text-center'>Connection</DialogTitle>}
        </DialogHeader>
        {isRegister ? (
          <Register form={form} onSubmit={userRegisterDTO}/>
        ) : (
          <Login form={form} onSubmit={userLoginDTO} />
        )}
        <DialogDescription className='space-y-4'>            
          <span className='text-center font-semibold'>ou</span>
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
