import { useEffect } from "react";
import { useState } from "react";
import { AxiosResponse } from "axios";

export function useQuery(
  key: string,
  queryFn: () => Promise<AxiosResponse<any>>,
  options: { onSuccess: () => void }
) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await queryFn();
        if (isMounted) {
          setData(response.data);
          options.onSuccess();
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [key, queryFn, options]);

  return { data, error, isLoading, isError };
}
