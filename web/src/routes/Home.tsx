import { Container } from "@/components/ui";
import useTransactions from "@/hooks/useTransactions";
import useWallets from "@/hooks/useWallets";
import toCurrency from "@/utils/toCurrency";
import toFormattedDate from "@/utils/toFormattedDate";
import { RiAddCircleLine } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import getColor from "@/utils/colorMap";

const Home = () => {
  const { data: walletsRes } = useWallets();
  const { data: transactions } = useTransactions();

  return (
    <>
      <Container as="section" className="relative mb-6 rounded-xl bg-white shadow">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-extrabold text-primary-main">Wallets</p>
          <Link
            to="/wallets"
            className="flex items-center gap-1 text-primary-main hover:text-primary-dark"
          >
            View Wallets <BsArrowRightShort className="text-2xl" />
          </Link>
        </div>

        {walletsRes && (
          <div className="flex flex-col gap-2 px-2">
            {walletsRes.wallets.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <p className={`${item.color ? getColor(item.color)?.value : "text-"}`}>
                  {item.name}
                </p>
                <p className="text-md font-bold">{toCurrency(item.balance)}</p>
              </div>
            ))}
            <hr />
            <div className="flex items-center justify-between">
              <p className="text-md">Total</p>
              <p className="text-md font-bold">{toCurrency(walletsRes.balance)}</p>
            </div>
          </div>
        )}
      </Container>
      {/* 
      <Container as="section" className="mb-6 rounded-xl bg-white shadow">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-extrabold text-primary-main">Monthly Summary (December)</p>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <div className="flex items-center justify-between">
            <p className={`text-md`}>Income</p>
            <p className="text-md font-bold text-green-500">P15,000.00</p>
          </div>

          <div className="flex items-center justify-between">
            <p className={`text-md`}>Expenses</p>
            <p className="text-md font-bold text-red-500">P13,000.00</p>
          </div>

          <hr />
          <div className="flex items-center justify-between">
            <p className={`text-md`}>Net Total</p>
            <p className="text-md font-bold text-green-500">P2,000.00</p>
          </div>
        </div>
      </Container> */}

      <Container as="section" className="mb-4 rounded-xl bg-white shadow">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-extrabold text-primary-main">Transactions</p>
          <button className="flex items-center gap-1 rounded-xl bg-primary-main py-2 px-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark">
            <RiAddCircleLine className="self-center text-xl" />
            Add Transaction
          </button>
        </div>

        <div className="flex flex-col gap-2 px-2">
          {transactions?.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-xs italic">{item.category.name}</p>
                <p className="text-xs italic">{item.wallet.name}</p>
              </div>

              <div className="text-end">
                <p
                  className={`text-md font-semibold ${
                    item.type === "EXPENSE" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {toCurrency(Math.abs(item.amount))}
                </p>
                <p className="text-xs italic">{toFormattedDate(item.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
