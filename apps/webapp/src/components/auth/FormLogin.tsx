import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema, UserRegisterDTO, UserRole } from '@baobbab/dtos';

export default function Login({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (userRegister: UserRegisterDTO) => void;
}) {
  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      email: values.email,
      password: values.password,
      role: UserRole.USER,
      created_at: new Date(),
    });
    console.warn(values);
  };

  console.log('all values', form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="rounded-lg">
              {' '}
              <FormControl>
                <Input placeholder="nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="adresse email" {...field} />
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
                <Input type="password" placeholder="mot de passe" {...field} />
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
