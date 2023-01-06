import { Container } from "@/components/ui";
import { CreateWalletModal } from "@/features/wallet/components";
import useWallets from "@/hooks/useWallets";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Wallets = () => {
  const [openCreateWalletModal, setOpenCreateWalletModal] = useState(false);
  const toggleCreateWalletModal = () => setOpenCreateWalletModal((prev) => !prev);

  const { data: walletsRes } = useWallets();

  return (
    <>
      <Container as="section" className="relative mb-6 rounded-xl bg-white shadow">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-extrabold text-primary-main">Wallets</p>
          <button onClick={() => toggleCreateWalletModal()}>Add</button>
        </div>

        <div className="flex flex-col gap-2">
          {walletsRes?.wallets.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded bg-gray-200 p-2 shadow"
            >
              <p className={`text-md`}>{item.name}</p>
              <button>
                <MdOutlineDeleteOutline />
              </button>
            </div>
          ))}
        </div>
      </Container>

      <CreateWalletModal isOpen={openCreateWalletModal} toggleIsOpen={toggleCreateWalletModal} />
    </>
  );
};

export default Wallets;
