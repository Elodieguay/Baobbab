import { describe, it, expect, vi } from 'vitest';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    prettyDOM,
} from '@testing-library/react';
import ModalBooking from '../components/booking/ModalBooking';
import '@testing-library/jest-dom';
window.HTMLElement.prototype.scrollIntoView = vi.fn();

vi.mock('@/hooks/booking/query', () => ({
    useCreateABooking: () => ({
        mutateAsync: vi.fn((_, options) => {
            options?.onSuccess?.();
            return Promise.resolve({});
        }),
    }),
    useUpdateUserBooking: () => ({
        mutateAsync: vi.fn().mockResolvedValue({}),
    }),
}));
vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({ toast: vi.fn() }),
}));
vi.mock('@/context/Auth.context', () => ({
    useAuth: () => ({ authToken: 'fake-token' }),
}));
vi.mock('@/hooks/user/query', () => ({
    useGetUser: () => ({ data: { id: 'user-123' } }),
}));
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({ toast: mockToast }),
}));
describe('ModalBooking', () => {
    it('submits form and calls createBooking', async () => {
        const mockSetIsModalOpen = vi.fn();

        render(
            <ModalBooking
                courseData={{
                    id: '1',
                    title: 'Yoga du matin',
                    description: 'Relaxation',
                    image: 'yoga.jpg',
                    duration: 60,
                    price: 25,
                    address: 'Rue des fleurs',
                    city: 'Nantes',
                    reminder: '1h avant',
                    position: { type: 'Point', coordinates: [-1.553, 47.218] },
                    category: { id: 'cat1', title: 'Bien-être' },
                    organisationId: 'org1',
                    schedule: [
                        {
                            id: 's1',
                            day: 'Lundi',
                            hours: '08:00-09:00',
                        },
                    ],
                    booking: [
                        {
                            title: 'Cours 1',
                            schedule: {
                                day: 'Lundi',
                                hours: '08:00-09:00',
                            },
                            courseId: '1',
                            scheduleId: 's1',
                        },
                    ],
                }}
                setIsModalOpen={mockSetIsModalOpen}
            />
        );
        console.log(prettyDOM(document.body));

        // Check that the course title is displayed
        expect(screen.getByText('Yoga du matin')).toBeInTheDocument();

        //  SelectBooking
        const selectButton = screen.getByRole('combobox');
        fireEvent.click(selectButton);

        const options = await screen.findAllByRole('option');

        const lundiOption = options.find(
            (option) =>
                option.textContent?.includes('Lundi') &&
                option.textContent?.includes('08:00')
        );

        expect(lundiOption).toBeTruthy();

        fireEvent.click(lundiOption!);

        // Submit the form
        const submitButton = screen.getByRole('button', {
            name: /Je confirme le cours d'essai/i,
        });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith({
                title: "Votre cours d'essai est enregistré",
                variant: 'success',
            });
        });
    });
});
