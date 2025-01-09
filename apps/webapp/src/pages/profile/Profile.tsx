import TableProfile from '@/components/tables/TableProfile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/Auth.context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Profile = (): JSX.Element => {
    console.log('je suis dans Profile');

    const { authToken, removeAuthToken, role, infos } = useAuth();
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

    return (
        <div>
            <nav className="flex justify-center text-2xl font-semibold h-24">
                <div>
                    {/* <p>Role: {role || 'Non défini'}</p>{' '} */}
                    <p>Bonjour {infos?.username}</p>
                </div>
            </nav>
            <div className="w-full h-full flex justify-center items-center">
                <section className="flex flex-col flex-grow-0 h-1/2 md:w-1/3 justify-between items-center gap-5 border-2">
                    <p>Vérification </p>
                    <Button
                        onClick={removeAuthToken}
                        variant="ghost"
                        className="bg-[#94c0af] text-white"
                    >
                        Se déconnecter
                    </Button>
                </section>
                <section className="md:w-2/3  flex flex-col flex-grow-0 items-center border-2">
                    <h1> Informations sur vos Cours d'essai</h1>
                    <TableProfile />
                </section>
            </div>
        </div>
    );
};

export default Profile;
