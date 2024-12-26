import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSchemaType, UserRegisterDTO, UserRole } from '@baobbab/dtos';
  

export default function Login({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<FormSchemaType>>;
  onSubmit: (userRegister: UserRegisterDTO) => void;
}) {

const { handleSubmit, register } = form;

  
  const onSubmitForm = (values: FormSchemaType) => {
    console.log("Form values:", values);

    const userRegister: UserRegisterDTO = { 
   
      username: values.username || '',
      email: values.email,
      password: values.password,
      role: UserRole.USER,
      created_at: new Date(),
    };
    console.warn(userRegister); // Debug : affiche les données envoyées
    onSubmit(userRegister);
  };

  console.log('all values', form.getValues());
  // console.log('handleSubmit', handleSubmit);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
           {/* Champ hidden pour username */}
           <input
          type="hidden"
          {...register("username", { value: 'defaultUsername' })} // Définir la valeur du champ username
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                placeholder="adresse email" 
                {...field}
                {...register("email", { required: "Email est requis" })} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                type="password" 
                placeholder="mot de passe" 
                {...field} 
                {...register("password", { required: "Mot de passe requis" })} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#0b927a] rounded-xl hover:bg-[#fdcf63]"
        >
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
