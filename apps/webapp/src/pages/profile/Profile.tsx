import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/Auth.context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Profile = (): JSX.Element => {
    console.log('je suis dans Profile');

    const { authToken, removeAuthToken, role } = useAuth();
    const navigate = useNavigate(); // Utilisation de useNavigate()

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

    console.log('role', role);
    console.log('authToken', authToken);

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <p>Page de votre profil</p>
            <p>Role: {role || 'Non défini'}</p>
            <Button onClick={removeAuthToken}>Se déconnecter</Button>
        </div>
    );
};

export default Profile;
