import { useAuth } from "@/context/Auth.context";

const Profile = () => {
   const { authToken, removeAuthToken, role} = useAuth();

   if (!authToken) {
     return (
       <div>Vous devez être connecté pour accéder à cette page</div>
      )
    }
    console.log('role', role);
    console.log('authToken', authToken);

  return (
    <div>
      <p>Page de votre profil</p>
      <p>Role: {role}</p>
      <button onClick={removeAuthToken}>Se déconnecter</button>
      </div>
  )
}

export default Profile