import { useState } from 'react';
import Login from '../form/auth/FormLogin';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import Register from '../form/auth/FormRegister';
import {
    formSchema,
    RegisterResponse,
    UserLoginDTO,
    UserRegisterDTO,
    formLoginSchema,
    LoginResponse,
    EntityType,
    UserRole,
} from '@baobbab/dtos';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/Auth.context';
import { UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import log from 'loglevel';
import { useLoginMutation, useRegisterMutation } from '@/hooks/auth/query';

export type FormSchemaType = z.infer<typeof formSchema>;

const Modal = (): JSX.Element => {
    const navigate = useNavigate();
    const { setAuthData } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const { mutate: registerMutate } = useRegisterMutation();
    const { mutate: loginMutate } = useLoginMutation();

    const userRegisterDTO = (userRegister: UserRegisterDTO): void => {
        registerMutate(userRegister, {
            onSuccess: (data: RegisterResponse) => {
                if (setAuthData) {
                    setAuthData(
                        data.access_token,
                        data.refresh_token,
                        UserRole.USER,
                        EntityType.USER,
                        data.username,
                        data.email
                    );
                } else {
                    log.error('setAuthData is not defined');
                }
            },
        });
    };
    const userLoginDTO = (userLogin: UserLoginDTO): void => {
        loginMutate(userLogin, {
            onSuccess: (data: LoginResponse) => {
                if (setAuthData) {
                    setAuthData(
                        data.access_token,
                        data.refresh_token,
                        UserRole.USER,
                        EntityType.USER,
                        data.username,
                        data.email
                    );
                } else {
                    log.error('setAuthData is not defined');
                }
            },
        });
    };

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
            <DialogContent className="font-normal p-10 rounded-2xl ">
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
                    <>
                        <Login form={formLogin} onSubmit={userLoginDTO} />
                        <Button
                            variant="ghost"
                            className=" underline"
                            onClick={() => navigate('/forgotPassword')}
                        >
                            Oups! j'ai oublié mon mot de passe
                        </Button>
                    </>
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
                        <Link to="/organisation">
                            <Button
                                variant="outline"
                                className="rounded-xl w-full bg-[#ffcd00] font-semibold "
                            >
                                Je suis une Organisation
                            </Button>
                        </Link>
                    </span>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
