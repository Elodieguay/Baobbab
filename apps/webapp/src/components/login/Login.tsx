import { useGetAllUserQuery } from './getUser.generated'

const Login = () => {

    const {data, loading, error} = useGetAllUserQuery()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


  return (
    <div>
        {data?.getAllUsers?.map((user) => (
         <ul>
            <li key={user.id}>{user.username}</li>
        </ul>   
        ))}
    </div>
  )
}

export default Login