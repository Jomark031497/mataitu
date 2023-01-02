import { getWalletsHandler } from "@/features/wallet/api/getWalletsHandler";
import { useQuery } from "@tanstack/react-query";

const useWallets = () => {
  const { data, error, isFetching } = useQuery(["wallets"], getWalletsHandler);

  return {
    data,
    error,
    isFetching,
  };
};

export default useWallets;
