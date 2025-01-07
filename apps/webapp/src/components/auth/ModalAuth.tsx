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
import {
    formSchema,
    RegisterResponse,
    UserLoginDTO,
    UserRegisterDTO,
    formLoginSchema,
} from '@baobbab/dtos';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useLoginMutation, useRegisterMutation } from '@/hooks/useAuthMutation';
import { useAuth } from '@/context/Auth.context';
import { UserRound } from 'lucide-react';

export type FormSchemaType = z.infer<typeof formSchema>;

const Modal = (): JSX.Element => {
    const { setAuthToken } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const { mutate: registerMutate } = useRegisterMutation();
    const { mutate: loginMutate } = useLoginMutation();
    console.log('loginMutate', loginMutate);

    const userRegisterDTO = (userRegister: UserRegisterDTO): void => {
        console.log('je suis dans userRegisterDTO', userRegister);

        registerMutate(userRegister, {
            onSuccess: (data: RegisterResponse) => {
                console.log('je suis dans onSuccess', data);
                console.log('data.token', data.access_token);
                console.log('data.role', data.role);

                if (setAuthToken) {
                    setAuthToken(data.access_token, data.role);
                    console.log('setAuthToken', setAuthToken);
                } else {
                    console.error('setAuthToken is not defined');
                }
            },
        });
    };
    const userLoginDTO = (userLogin: UserLoginDTO): void => {
        // console.log('je suis dans userLoginDTO', userLogin);

        loginMutate(userLogin, {
            onSuccess: (data: RegisterResponse) => {
                console.log('je suis dans onSuccess de login', data);
                console.log('data.token de login', data.access_token);
                console.log('data.role de login', data.role);

                if (setAuthToken) {
                    setAuthToken(data.access_token, data.role);
                    console.log('setAuthToken de login', setAuthToken);
                } else {
                    console.error('setAuthToken is not defined');
                }
            },
        });
    };

    // console.log('userLoginDTO', userLoginDTO);

    const openRegister = (): void => {
        setIsRegister(true);
    };
    const openLogin = (): void => {
        setIsRegister(false);
    };

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const formLogin = useForm<z.infer<typeof formLoginSchema>>({
        resolver: zodResolver(formLoginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Dialog>
            <DialogTrigger className="flex flex-col items-center text-base font-medium">
                <UserRound />
                connection
            </DialogTrigger>
            <DialogContent className="bg-[#faf7f0] px-10 font-normal ">
                <DialogHeader>
                    {isRegister ? (
                        <DialogTitle className="text-center">
                            Créer un compte
                        </DialogTitle>
                    ) : (
                        <DialogTitle className="text-center">
                            Connection
                        </DialogTitle>
                    )}
                </DialogHeader>
                {isRegister ? (
                    <Register form={form} onSubmit={userRegisterDTO} />
                ) : (
                    <Login form={formLogin} onSubmit={userLoginDTO} />
                )}
                <DialogDescription className="space-y-4 flex flex-col ">
                    <span className="text-center justify-center font-semibold">
                        ou
                    </span>
                    {isRegister ? (
                        <Button
                            variant="outline"
                            className="rounded-xl w-full"
                            onClick={openLogin}
                        >
                            J'ai déjà un compte
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="rounded-xl w-full"
                            onClick={openRegister}
                        >
                            Créer un compte
                        </Button>
                    )}
                    <span className="font-bold">
                        <Button
                            variant="outline"
                            className="rounded-xl w-full bg-[#ffcd00] text-base"
                        >
                            Je suis une Organisation
                        </Button>
                    </span>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
