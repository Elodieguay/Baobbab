import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

type MultiSelectProps = {
    options: { label: string; value: string }[]; // Liste des options

    field: {
        value: string[];
        onChange: (value: string[]) => void;
    }; // Field from React Hook Form
};

const MultiSelect: React.FC<MultiSelectProps> = ({ options, field }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    {field.value?.length > 0
                        ? `${field.value.length} sélectionné(s)`
                        : 'Choisissez des options'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
                <div className="flex flex-col space-y-2">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(isChecked) => {
                                    const newValue = isChecked
                                        ? [...(field.value || []), option.value]
                                        : field.value.filter(
                                              (v: string) => v !== option.value
                                          );
                                    field.onChange(newValue);
                                }}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default MultiSelect;
