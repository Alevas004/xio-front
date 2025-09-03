import { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const useDelete = (url: string, options?: { withAuth: boolean }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((store: RootState) => store.auth.token);

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      const validationRole = options?.withAuth
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};
      const res = await axios.delete(`${BASE_URL}/${url}/${id}`, {
        headers: validationRole,
      });

      // Los códigos de éxito para DELETE son 200, 202, 204
      if (res.status !== 200 && res.status !== 202 && res.status !== 204) {
        throw new Error("Failed to delete item");
      }

      console.log(res.data);
      setData(res.data || { success: true }); // Para 204 que no tiene body
      setError(null);
      setLoading(false);
    } catch (error: unknown) {
      console.error("Error deleting item:", error);
      setError(String(error));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, data, error, loading };
};
