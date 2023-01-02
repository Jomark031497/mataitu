import { Input } from "@/components/ui";
import createWalletHandler from "@/features/wallet/api/createWalletHandler";
import { CreateWalletInputs, CreateWalletSchema } from "@/features/wallet/schema/wallet.schema";
import queryClient from "@/lib/queryClient";
import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const CreateWalletModal = ({ isOpen, toggleIsOpen }: Props) => {
  const createButtonRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateWalletInputs>({
    resolver: zodResolver(CreateWalletSchema),
  });

  const onSubmit: SubmitHandler<CreateWalletInputs> = async (values) => {
    try {
      await createWalletHandler(values);
      queryClient.invalidateQueries(["wallets"]);
      reset();
      toggleIsOpen();
      toast.success("Wallet Created");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleIsOpen()}
      initialFocus={createButtonRef}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-[85%] max-w-sm rounded bg-white p-4">
          <Dialog.Title className="text-lg font-semibold text-primary-main">
            Create Wallet
          </Dialog.Title>
          <hr />

          <form onSubmit={handleSubmit(onSubmit)} className="my-2 flex flex-col gap-2">
            <div>
              <Input
                label="Name"
                {...register("name", { required: true })}
                formError={errors.name}
              />
            </div>

            <div className="flex gap-1">
              <button
                type="submit"
                disabled={isSubmitting}
                ref={createButtonRef}
                className={`focus:shadow-outline min-w-[100px] flex-1 rounded py-2 px-4 font-bold text-white transition-all focus:outline-none
               ${
                 isSubmitting
                   ? "bg-gray-400 text-white"
                   : "bg-primary-main text-white hover:bg-primary-dark"
               }
            `}
              >
                Create
              </button>
              <button
                disabled={isSubmitting}
                onClick={() => toggleIsOpen()}
                className={`focus:shadow-outline min-w-[100px] flex-1 rounded py-2 px-4 font-bold text-white transition-all focus:outline-none
               ${
                 isSubmitting
                   ? "bg-gray-400 text-white"
                   : "bg-gray-300 text-black hover:bg-gray-200"
               }
            `}
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateWalletModal;
