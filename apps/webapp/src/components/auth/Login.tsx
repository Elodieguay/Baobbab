
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Le nom doit contenir au moins 4 caractères.',
  }),
  email: z.string().email({
    message: "L'adresse email n'est pas valide.",
  }),
  password: z
  .string()
  .min(8, 
    { message: 'Le mot de passe doit contenir au moins 8 caractères.' }
  )
  .regex(passwordValidation, {
    message:
    "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
  }),
})

export default function Login() {

  const form =useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      username:"",
      email:"",
      password:""
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem         className="rounded-lg"
>              <FormControl>
                <Input placeholder="nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        className="w-full bg-[#0b927a] rounded-xl hover:bg-[#fdcf63]">Se connecter</Button>
      </form>
    </Form>
  )
}

