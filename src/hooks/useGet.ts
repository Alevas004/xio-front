"use client";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface UseGetResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<T | void>;
}

export const useGet = <T>(
  url: string,
  options?: { withAuth: boolean; queryParams?: Record<string, string | number> }
): UseGetResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((store: RootState) => store.auth.token);

  // Extraer y memoizar las dependencias
  const withAuth = options?.withAuth;
  const queryParams = useMemo(
    () => options?.queryParams,
    [options?.queryParams]
  );

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const validationRole = withAuth
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};

      // Construir URL con query params
      const queryString = queryParams
        ? "?" +
          new URLSearchParams(queryParams as Record<string, string>).toString()
        : "";

      const res = await axios.get(`${BASE_URL}${url}${queryString}`, {
        headers: validationRole,
      });
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
        return;
      }
    } catch (error: unknown) {
      console.error(error);
      setError(String(error));
      setLoading(false);
    }
  }, [url, withAuth, queryParams, token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error, refetch: getData };
};
