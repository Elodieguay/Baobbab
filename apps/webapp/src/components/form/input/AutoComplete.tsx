/* eslint-disable */

import { useMemo, useState } from 'react';
import { CommandEmpty, CommandGroup, CommandItem, CommandList, Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/utils/utils';
import { PopoverAnchor, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Check } from 'lucide-react';
import { Popover } from '@/components/ui/popover';
import { Command } from '@/components/ui/command';
import { Input } from '@/components/ui/input';

interface Props<T extends string> {
    selectedValue: T;
    onSelectedValueChange: (value: T) => void;
    searchValue: string;
    onSearchValueChange: (value: string) => void;
    items: { value: T; label: string }[];
    isLoading?: boolean;
    emptyMessage?: string;
    placeholder?: string;
    className?: string;
}

const AutoComplete = ({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage,
  placeholder,
  className,
}: Props<string>) => {

  const [open, setOpen] = useState(false)
  /* eslint-disable */
  const labels = useMemo(
    (): Record<string, string> =>
      items.reduce((acc, item): Record<string, string> => {
        acc[item.value] = item.label
        return acc
      }, {} as Record<string, string>),

    [items],

  )

  const reset = () => {
    onSelectedValueChange('' as typeof selectedValue)
    onSearchValueChange('')
  }
  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (
     !e.relatedTarget?.hasAttribute('cmdk-list') && labels[selectedValue] !== searchValue
    ) {
      reset()
    }
  }
/* eslint-disable */

  const onSelectItem = (inputValue: string):void => {
    if (inputValue === selectedValue) {
      reset()
    }
    else {
      onSelectedValueChange(inputValue as typeof selectedValue)
      onSearchValueChange(labels[inputValue] ?? '')
    }
    setOpen(false)
  }

    return (
        <div className="flex items-center ">
            <Popover open={open} onOpenChange={setOpen}>
                <Command>
                    <PopoverAnchor asChild className={className}>
                        <CommandPrimitive.Input
                            asChild
                            value={searchValue}
                            onValueChange={onSearchValueChange}
                            onKeyDown={(e) => setOpen(e.key !== 'Escape')}
                            onBlur={onInputBlur}
                        >
                            <Input placeholder={placeholder} />
                        </CommandPrimitive.Input>
                    </PopoverAnchor>
                    {!open && (
                        <CommandList aria-hidden="true" className="hidden" />
                    )}
                    <PopoverTrigger>
                        <PopoverContent
                            asChild
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            onInteractOutside={(e) => {
                                if (
                                    e.target instanceof Element &&
                                    e.target.hasAttribute('cmdk-input')
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            className="w-[--radix-popover-trigger-width] p-0 bg-white"
                        >
                            <CommandList>
                                {isLoading && (
                                    <CommandPrimitive.Loading>
                                        <div className="p-1">
                                            {/* <Skeleton className="h-6 w-full" /> */}
                                            loading
                                        </div>
                                    </CommandPrimitive.Loading>
                                )}

                                {items.length > 0 && !isLoading ? (
                                    <CommandGroup>
                                        {items.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onSelect={onSelectItem}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',

                                                        selectedValue ===
                                                            option.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                ) : null}
                                {!isLoading ? (
                                    <CommandEmpty>
                                        {emptyMessage ?? 'No items.'}
                                    </CommandEmpty>
                                ) : null}
                            </CommandList>
                        </PopoverContent>
                    </PopoverTrigger>
                </Command>
            </Popover>
        </div>
    );
};

export default AutoComplete;
