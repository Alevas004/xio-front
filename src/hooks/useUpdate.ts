import { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const useUpdate = <TData = unknown, TResponse = unknown>(
  url: string,
  options?: { withAuth: boolean }
) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((store: RootState) => store.auth.token);

  const updateItem = async (id: string, body: TData) => {
    setLoading(true);
    try {
      const validationRole = options?.withAuth
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};
      const res = await axios.put(`${BASE_URL}/${url}/${id}`, body, {
        headers: validationRole,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update item");
      }
      if (res.status == 200) {
        console.log(res.data);
        setData(res.data);
        setError(null);
        setLoading(false);
        return res.data;
      }
    } catch (error: unknown) {
      console.error("Error deleting item:", error);
      setError(String(error));
      setLoading(false);
    }
  };

  return { updateItem, data, error, loading };
};
