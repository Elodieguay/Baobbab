import { useModal } from '@/context/Modal.context';

const Courses = (): JSX.Element => {
    const { openModal } = useModal();

    return (
        <div>
            <h1>Détails du cours</h1>
            <button onClick={openModal}>Réserver un cours d'essai</button>
        </div>
    );
};

export default Courses;
