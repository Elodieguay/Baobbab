import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import log from 'loglevel';

type SelectBookingProps = {
    title: string;
    data?: { day: string; hours: string }[];
    value: string | null;
    onChange?: (value: string) => void;
} & React.ComponentPropsWithoutRef<typeof Select>;

const SelectBooking = React.forwardRef<HTMLButtonElement, SelectBookingProps>(
    ({ title, data, value, onChange, ...props }, ref) => {
        const handleChange = (value: string) => {
            const selectedItem = data?.find((item) => item.day === value);
            if (selectedItem && onChange) {
                const item = `${selectedItem?.day},${selectedItem?.hours}`;
                log.debug('selectedItem', item);
                onChange(item);
            }
        };

        log.debug('valueSelectChange', value);

        const formatDisplayValue = (value: string | null) => {
            if (!value || typeof value !== 'string')
                return 'Sélectionner un jour';
            const [day, hours] = value.split(',');
            return `${day} à ${hours}`;
        };
        const selectedValue = formatDisplayValue(value);
        log.debug('selectedValue:', selectedValue);
        return (
            <Select
                {...props}
                value={value}
                onValueChange={(value) => handleChange(value)}
            >
                <SelectTrigger
                    ref={ref}
                    className="w-full"
                    data-testid="select-trigger"
                    aria-label={title}
                >
                    <SelectValue placeholder="Sélectionner un jour">
                        {selectedValue}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{title}</SelectLabel>
                        {data?.map((item, index) => (
                            <SelectItem key={index} value={item.day}>
                                {item.day} à {item.hours}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        );
    }
);

export default SelectBooking;
