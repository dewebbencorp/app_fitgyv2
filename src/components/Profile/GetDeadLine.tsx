import { useState } from "react";

export const GetDeadLine = (inputDate: string) => {
  const [deadline, setDeadline] = useState<string | null>(null);

  const calculateDeadline = () => {
    const currentDate = new Date();
    const inputDateObject = new Date(inputDate);

    if (isNaN(inputDateObject.getTime())) {
      // La fecha proporcionada no es válida
      setDeadline(null);
    } else {
      const newDate = new Date(
        currentDate.getTime() +
          inputDateObject.getTime() -
          currentDate.getTime()
      );
      const formattedDate = newDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDeadline(formattedDate);
    }
  };

  return { deadline, calculateDeadline };
};
