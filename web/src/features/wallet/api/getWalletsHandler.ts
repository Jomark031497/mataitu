import { WalletsTypeRes } from "@/features/wallet/schema/wallet.schema";

export const getWalletsHandler = async (): Promise<WalletsTypeRes> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(data));

  return data;
};
