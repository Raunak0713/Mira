import { useState } from "react";
import { toast } from "sonner";

type UseFetchReturnType<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  fn: (...args: any[]) => Promise<void>; // Add the `fn` function here
};

const useFetch = <T>(cb: (...args: any[]) => Promise<T>): UseFetchReturnType<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await cb(...args);
      setData(res);
      setError(null);
    } catch (error: any) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, setData, fn }; // Return `fn` here
};

export default useFetch;
