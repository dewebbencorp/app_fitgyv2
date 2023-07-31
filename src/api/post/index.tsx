import { useState, useEffect } from "react";

const BASE_URL = "https://187.188.16.29:4431/webservice-app2/Controllers/";

export const UseFecthPost = (request: {}, END: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [detailError, setErrorDetail] = useState([]);

  useEffect(() => {
    // Función para verificar si el objeto está vacío
    const isObjectEmpty = (obj: {}) => {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    };

    if (!isObjectEmpty(request)) {
      console.log("ESTO ES UNA PETICION");
      fetch(BASE_URL + END, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorDetail(error);
        })
        .finally(() => setLoading(false));
    }
  }, [request, END]);

  return { data, loading, error, detailError };
};
