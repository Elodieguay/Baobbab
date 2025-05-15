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
} from '@baobbab/dtos';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
    useLoginMutation,
    useRegisterMutation,
} from '@/hooks/auth/useAuthMutation';
import { useAuth } from '@/context/Auth.context';
import { UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import log from 'loglevel';
import { useTranslation } from 'react-i18next';

export type FormSchemaType = z.infer<typeof formSchema>;

const Modal = (): JSX.Element => {
    const navigate = useNavigate();
    const { setAuthData } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const { mutate: registerMutate } = useRegisterMutation();
    const { mutate: loginMutate } = useLoginMutation();
    const { t } = useTranslation('common', {
        keyPrefix: 'Auth',
    });
    const userRegisterDTO = (userRegister: UserRegisterDTO): void => {
        registerMutate(userRegister, {
            onSuccess: (data: RegisterResponse) => {
                if (setAuthData) {
                    setAuthData(
                        data.access_token,
                        data.role,
                        'user',
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
                        data.role,
                        'user',
                        data.email,
                        data.username,
                        data.id
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
                {t('userLogin.form.connection')}
            </DialogTrigger>
            <DialogContent className="font-normal p-10 rounded-2xl ">
                <DialogHeader>
                    {isRegister ? (
                        <DialogTitle className="text-center text-[#be3565]">
                            {t('userRegister.form.title')}
                        </DialogTitle>
                    ) : (
                        <DialogTitle className="text-center">
                            {t('userLogin.form.connection')}
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
                            {t('userModal.form.forgotten')}
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
                            {t('userModal.form.already')}
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="rounded-xl w-full"
                            onClick={openRegister}
                        >
                            {t('userModal.form.register')}
                        </Button>
                    )}
                    <span className="font-bold">
                        <Link to="/organisation">
                            <Button
                                variant="outline"
                                className="rounded-xl w-full bg-[#ffcd00]"
                            >
                                {t('userModal.form.Organisation')}
                            </Button>
                        </Link>
                    </span>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
