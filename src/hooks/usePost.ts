import { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const usePost = <TData = any, TResponse = any>(url: string, options?: { withAuth: boolean }) => {
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector((store: RootState) => store?.auth?.token);

    const postData = async (data: TData) => {
        setLoading(true);
        try {

            const validationRole = options?.withAuth ? {
                Authentication: `Bearer ${token}`
            } : {};

            const res = await axios.post(`${BASE_URL}${url}`, data, {
                headers: validationRole
            });
            console.log('Data recibida',res.data)
            setData(res.data);
            setLoading(false);
            setError(null);
            return res.data;
        } catch (error: string | any) {
            console.error("Error posting data:", error);
            setError(error.response?.data.message || error.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return { postData, data, loading, error };
}