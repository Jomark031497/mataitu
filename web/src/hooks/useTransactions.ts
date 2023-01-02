import getTransactionsHandler from "@/features/transaction/api/getTransactionsHandler";
import { useQuery } from "@tanstack/react-query";

const useTransactions = () => {
  const { data, error, isFetching } = useQuery(["transactions"], getTransactionsHandler);

  return {
    data,
    error,
    isFetching,
  };
};

export default useTransactions;
