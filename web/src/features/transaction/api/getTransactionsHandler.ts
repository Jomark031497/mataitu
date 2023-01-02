import { TransactionType } from "@/features/transaction/schema/transaction.schema";

const getTransactionsHandler = async (): Promise<TransactionType[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transaction/`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(data));

  return data;
};

export default getTransactionsHandler;
