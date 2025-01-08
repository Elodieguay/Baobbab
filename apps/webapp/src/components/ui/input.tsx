import * as React from 'react';

import { cn } from '@/utils/utils';
interface InputProps extends React.ComponentProps<'input'> {
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, ...props }, ref) => {
        return (
            <div className="flex items-center rounded-xl bg-transparent ">
                {icon && (
                    <div className="mr-2 text-neutral-500 dark:text-neutral-400 w-1/4">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-xl border outline-none border-neutral-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium file:text-neutral-950 placeholder:text-neutral-500   disabled:cursor-not-allowed disabled:opacity-50  dark:file:text-neutral-50 dark:placeholder:text-neutral-400 ',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
