import { LoginInputs, UserType } from "@/features/auth/auth.schema";

const loginHandler = async (payload: LoginInputs): Promise<UserType> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(data), { cause: data });

  return data;
};

export default loginHandler;
