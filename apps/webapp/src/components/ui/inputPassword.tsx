import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useState } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    action?: React.ReactNode;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, action, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative w-full">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className={cn(
                        `
            h-10 w-full rounded-xl border border-neutral-200 bg-white
            px-4 pr-10 py-2
            ring-offset-white outline-none
            file:border-0 file:bg-transparent file:font-medium file:text-neutral-950
            placeholder:text-neutral-500
            disabled:cursor-not-allowed disabled:opacity-50
            dark:file:text-neutral-50 dark:placeholder:text-neutral-400
            `,
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        );
    }
);

InputPassword.displayName = 'Input';

export { InputPassword };
