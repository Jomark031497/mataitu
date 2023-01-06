import { getWalletsHandler } from "@/features/wallet/api/getWalletsHandler";
import { useQuery } from "@tanstack/react-query";

const useWallets = () => {
  const { data, error, isFetching, isLoading } = useQuery(["wallets"], getWalletsHandler);

  return {
    data,
    error,
    isFetching,
    isLoading,
  };
};

export default useWallets;
