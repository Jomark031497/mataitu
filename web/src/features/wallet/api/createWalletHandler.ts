import { CreateWalletInputs } from "@/features/wallet/schema/wallet.schema";

const createWalletHandler = async (payload: CreateWalletInputs) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(data));

  return data;
};

export default createWalletHandler;
