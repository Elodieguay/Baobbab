// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '../ui/dialog';
// import { Button } from '../ui/button';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import log from 'loglevel';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { Link } from 'react-router';

type ModalBookingProps = {
    data: CoursesDTOGeojson | undefined;
};
const ModalBooking = ({ data }: ModalBookingProps): JSX.Element => {
    log.info(data);

    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    //   })

    //   function onSubmit(data: z.infer<typeof FormSchema>) {
    //     toast({
    //       title: "You submitted the following values:",
    //       description: (
    //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //         </pre>
    //       ),
    //     })
    //   }
    return (
        <div>re</div>
        //     <Dialog>
        //         <DialogTrigger className="flex flex-col items-center text-base font-medium">
        //             Réserver un cours d'essai
        //         </DialogTrigger>
        //         <DialogContent className="font-normal p-10 rounded-2xl ">
        //             <DialogHeader>
        //                 <DialogTitle> Réserver un cours d'essai</DialogTitle>
        //                 <DialogDescription className="space-y-4 flex flex-col ">
        //                     Je confirme que je réserve un cours d'éssai pour ce
        //                     cours
        //                 </DialogDescription>
        //             </DialogHeader>

        //             <Form {...form}>
        //   <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        //     <FormField
        //       control={form.control}
        //       name="email"
        //       render={({ field }) => (
        //         <FormItem>
        //           <FormLabel>Email</FormLabel>
        //           <Select onValueChange={field.onChange} defaultValue={field.value}>
        //             <FormControl>
        //               <SelectTrigger>
        //                 <SelectValue placeholder="Select a verified email to display" />
        //               </SelectTrigger>
        //             </FormControl>
        //             <SelectContent>
        //               <SelectItem value="m@example.com">m@example.com</SelectItem>
        //               <SelectItem value="m@google.com">m@google.com</SelectItem>
        //               <SelectItem value="m@support.com">m@support.com</SelectItem>
        //             </SelectContent>
        //           </Select>
        //           <FormDescription>
        //             You can manage email addresses in your{" "}
        //           </FormDescription>
        //           <FormMessage />
        //         </FormItem>
        //       )}
        //     />
        //     <Button type="submit">Submit</Button>
        //   </form>
        // </Form>
        //             <DialogFooter>
        //                 <Button
        //                     variant="outline"
        //                     className="rounded-xl w-full bg-[#ffcd00] text-base"
        //                 >
        //                     Je confirme le cours d'essai
        //                 </Button>
        //             </DialogFooter>
        //         </DialogContent>
        //     </Dialog>
    );
};

export default ModalBooking;
