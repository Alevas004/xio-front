"use client";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface UseGetResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<T | void>;
}

export const useGet = <T>(url: string, options?: { withAuth: boolean }): UseGetResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((store: RootState) => store.auth.token);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const validationRole = options?.withAuth
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};
      const res = await axios.get(`${BASE_URL}${url}`, {
        headers: validationRole,
      });
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
        return;
      }
    } catch (error: any) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  }, [url, options?.withAuth, token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error, refetch: getData };
};
