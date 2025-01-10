import { useEffect, useState } from 'react';

export const useFetchHook = (url: string) => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [url]);

  return { data, loading, error };
};
