import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export const courses = [
    {
        id: 1,
        course: 'Cours de danse',
        day: 'lundi, mercredi, vendredi',
        hour: '18h',
        address: '10 Rue de Paris, Nantes',
        reminder: 'Apporter des chaussures',
        description:
            "Découvrez l'art des nœuds traditionnels coréens dans un cadre convivial. Ce cours est idéal pour lesamateurs de DIY ou les curieux",
    },
    {
        id: 2,
        course: 'Cours de yoga',
        day: 'mardi, samedi, dimanche',
        hour: '20h',
        address: '25 Rue des Lilas, Lyon',
        reminder: 'Prendre un tapis de yoga',
        description:
            "Découvrez l'art des nœuds traditionnels coréens dans un cadre convivial. Ce cours est idéal pour lesamateurs de DIY ou les curieux",
    },
];
