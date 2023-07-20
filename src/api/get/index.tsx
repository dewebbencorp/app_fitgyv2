import { useState, useEffect } from 'react';
const BASE_URL = "https://187.188.16.29:4431/webservice-app2/Controllers/"
export const UseFecth = (END: string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [detaiError, setErrorDetail] = useState([]);

    useEffect(() => {
        fetch(BASE_URL + END, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => {
                console.log(error);
                setError(true);
                setErrorDetail(error);
            })
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error, detaiError };
};

export const useFecthAwait = async (END: string) => {
    const res = await fetch(BASE_URL + END);
    const json = await res.json();
    return { json };
};