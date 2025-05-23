import { cn } from '@/utils/utils';

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800',
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
