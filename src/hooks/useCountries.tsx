// hooks/useCountries.ts
import { useState, useEffect } from 'react';
import { Country } from '../interface/conuntry';

export function useCountries() {
  const [fetchedcountries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const cachedData = localStorage.getItem('countriesData');
        const cachedTimestamp = localStorage.getItem('countriesTimestamp');

        if (cachedData && cachedTimestamp) {
          const currentTime = new Date().getTime();
          const cacheAge = currentTime - parseInt(cachedTimestamp);

          // Use cached data if it's less than 1 hour old
          if (cacheAge < 3600000) {
            setCountries(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
        localStorage.setItem('countriesData', JSON.stringify(data));
        localStorage.setItem('countriesTimestamp', new Date().getTime().toString());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { fetchedcountries, loading, error };
}
