import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import { columns } from '@/components/profile/profileTable/Columns';
import { DataTable } from '@/components/profile/profileTable/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/context/Auth.context';
import { useCity } from '@/context/City.context';
import { useGetUserBooking } from '@/hooks/booking/query';
import { useGetUser } from '@/hooks/user/query';
import { AtSign, CircleUser } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import NotLogin from '../notFound/NotLogin';

const Profile = (): JSX.Element => {
    const { authData } = useAuth();

    const { city } = useCity();
    const navigate = useNavigate();
    const { data: user } = useGetUser();
    const userId = user?.id;

    const { data: userBooking } = useGetUserBooking(userId || '');
    const { t } = useTranslation('common', {
        keyPrefix: 'Profile',
    });

    useEffect(() => {
        if (!authData?.token) {
            navigate('/login');
        }
    }, [authData?.token, navigate]);

    if (!authData?.token) {
        return (
            <div>
                <NotLogin />
            </div>
        );
    }
    if (!user) {
        return (
            <div>
                <NotLogin />
            </div>
        );
    }

    const handleGoBack = () => {
        if (city) {
            navigate(`/courses/${city}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className=" flex flex-col items-center ">
            <Navbar />
            <div className="w-full min-h-screen bg-slate-100  rounded-lg p-4 flex flex-col gap-6">
                <div>
                    <Button onClick={handleGoBack}>{t('page.button')}</Button>
                </div>
                <section className="flex flex-col items-center gap-9 w-full">
                    <Card className="w-full lg:w-1/3 bg-buttonPink rounded-md p-4 text-white">
                        <CardHeader className="text-center text-white font-semibold">
                            {t('page.card.header')}
                        </CardHeader>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-center border-b pb-2">
                                <CircleUser />
                                <span className="ml-4">{user?.username}</span>
                            </li>
                            <li className="flex items-center border-b pb-2">
                                <AtSign />
                                <span className="ml-4">{user.email}</span>
                            </li>
                        </ul>
                    </Card>
                    <div className="flex flex-col w-full lg:w-2/3 bg-white rounded-md shadow-md p-4">
                        <h2 className="text-center font-semibold">
                            {t('page.table.title')}
                        </h2>
                        <div className="w-full overflow-auto">
                            <DataTable
                                columns={columns}
                                data={userBooking || []}
                            />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
