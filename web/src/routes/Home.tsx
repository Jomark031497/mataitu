import { Container } from "@/components/ui";
import toCurrency from "@/utils/toCurrency";
import { RiAddCircleLine } from "react-icons/ri";

const Home = () => {
  const sampleWallets = [
    {
      name: "Unionbank Debit Card",
      amount: "P10,000.00",
      color: "text-[#00DD77]",
    },
    {
      name: "BDO Debit Card",
      amount: "P5,300.00",
      color: "text-[#00DDFF]",
    },
    {
      name: "Maya Wallet",
      amount: "P15,300.00",
      color: "text-[#FF7700]",
    },
    {
      name: "GCash",
      amount: "P300.00",
    },
    {
      name: "Home Wallet",
      amount: "P10,000.00",
    },
  ];

  const sampleTransactions = [
    {
      name: "Google Pixel 6a",
      category: "Electronics and Gadgets",
      wallet: "Unionbank Debit Card",
      amount: 17900,
      type: "expense",
      date: "December 27, 2022",
    },
    {
      name: "Payroll",
      category: "Payroll/Work Related",
      wallet: "BDO Debit Card",
      amount: 20300,
      type: "income",
      date: "December 15, 2022",
    },
    {
      name: "13th Month Pay",
      category: "Payroll/Work Related",
      wallet: "Unionbank Debit Card",
      amount: 25700,
      type: "income",
      date: "December 02, 2022",
    },
    {
      name: "Christmas Gifts",
      category: "Gifts",
      wallet: "Home Wallet",
      amount: 5200,
      type: "expense",
      date: "December 01, 2022",
    },
  ];

  return (
    <>
      <Container as="section" className="mb-6 rounded-xl bg-white shadow">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-extrabold text-primary-main">Your Wallets</p>
          <button className="flex items-center gap-1 rounded-xl bg-primary-main py-2 px-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark">
            <RiAddCircleLine className="self-center text-xl" />
            Add Wallet
          </button>
        </div>

        <div className="flex flex-col gap-2 px-2">
          {sampleWallets.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div>
                <p className={`text-md ${item.color ? item.color : "text-black"}`}>{item.name}</p>
              </div>

              <div>
                <p className="text-md font-bold">{item.amount}</p>
              </div>
            </div>
          ))}
          <hr />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-md">Total</p>
            </div>

            <div>
              <p className="text-md font-bold">P40,900.00</p>
            </div>
          </div>
        </div>
      </Container>

      <Container as="section" className="mb-4 rounded-xl bg-white shadow">
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
      </Container>

      <Container as="section" className="mb-4 rounded-xl bg-white shadow">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-extrabold text-primary-main">Transactions</p>
          <button className="flex items-center gap-1 rounded-xl bg-primary-main py-2 px-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark">
            <RiAddCircleLine className="self-center text-xl" />
            Add Transaction
          </button>
        </div>

        <div className="flex flex-col gap-2 px-2">
          {sampleTransactions.map((item) => (
            <div key={item.name} className="flex justify-between">
              <div>
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-xs italic">{item.category}</p>
                <p className="text-xs italic">{item.wallet}</p>
              </div>

              <div className="text-end">
                <p
                  className={`text-md font-semibold ${
                    item.type === "expense" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.type === "income" ? null : "-"}
                  {toCurrency(item.amount)}
                </p>
                <p className="text-xs italic">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
