import TableProfile from '@/components/tables/TableProfile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/Auth.context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Profile = (): JSX.Element => {
    console.log('je suis dans Profile');

    const { authToken, removeAuthToken, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
        if (!authToken) {
            navigate('/login'); // Redirection avec navigate
        }
    }, [authToken, navigate]);

    // Si l'utilisateur n'est pas connecté, affiche un message
    if (!authToken) {
        return <div>Vous devez être connecté pour accéder à cette page</div>;
    }

    // console.log('role', role);
    // console.log('authToken', authToken);

    return (
        <div>
            <nav>
                <div>baobbab</div>
                <div>
                    <p>Role: {role || 'Non défini'}</p>{' '}
                </div>
                <p>Vérification </p>
            </nav>
            <div className="w-full h-full">
                <section className="flex flex-col md:w-1/3 justify-center items-center gap-5">
                    <p>Page profile</p>
                    <Button onClick={removeAuthToken}>Se déconnecter</Button>
                </section>
                <section className="md:w-2/3 flex flex-col items-center">
                    <h1> Informations sur vos Cours d'essai</h1>
                    <TableProfile />
                </section>
            </div>
        </div>
    );
};

export default Profile;
