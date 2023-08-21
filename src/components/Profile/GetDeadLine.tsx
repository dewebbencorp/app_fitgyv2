import { useState } from 'react';

export const GetDeadLine = (days: number) => {
    const [deadline, setDeadline] = useState<string | null>(null);

    const calculateDeadline = () => {
        const currentDate = new Date();
        const newDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
        const formattedDate = newDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        setDeadline(formattedDate);
    };

    return { deadline, calculateDeadline };
};
