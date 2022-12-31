import useAuth from "@/hooks/useAuth";
import { HiMenuAlt3, HiUserAdd, HiOutlineKey } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { BiWalletAlt, BiReceipt } from "react-icons/bi";

const Navbar = () => {
  const { user, handleLogout } = useAuth();

  return (
    <header className="relative flex min-h-[80px] items-center justify-between px-6">
      <Link
        to="/"
        className="text-3xl font-extrabold text-primary-main transition-all hover:text-primary-dark"
      >
        mataitu
      </Link>

      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center">
              <HiMenuAlt3 className="text-3xl font-bold text-primary-main transition-all hover:text-primary-dark" />
            </Menu.Button>
            <Transition
              show={open}
              enter="transform transition duration-100 ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transform transition duration-75 ease-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items
                className="absolute right-0 min-w-[200px] origin-top-right rounded bg-white shadow-xl"
                static
              >
                {user ? (
                  <div className="p-1">
                    {[
                      { label: "Home", icon: AiOutlineHome, href: "/home" },
                      { label: "Wallets", icon: BiWalletAlt, href: "/wallets" },
                      { label: "Transactions", icon: BiReceipt, href: "/transactions" },
                    ].map((item) => (
                      <Menu.Item key={item.label}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={`flex items-center gap-2 rounded p-2 transition-all ${
                              active ? "bg-blue-500 text-white" : "text-gray-700"
                            }`}
                          >
                            <item.icon
                              className={`text-2xl text-primary-main ${
                                active ? "text-white" : "text-gray-400"
                              }`}
                            />
                            {item.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                    <hr />
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`flex w-full gap-2 rounded p-2 transition-all ${
                            active ? "bg-blue-500 text-white" : "text-gray-700"
                          }`}
                        >
                          <AiOutlineLogout
                            className={`text-2xl text-primary-main ${
                              active ? "text-white" : "text-gray-400"
                            }`}
                          />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                ) : (
                  <div className="p-1">
                    {[
                      { label: "Login", icon: HiOutlineKey, href: "/login" },
                      { label: "Sign Up", icon: HiUserAdd, href: "/signup" },
                    ].map((item) => (
                      <Menu.Item key={item.label}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={`flex items-center gap-2 rounded p-2 transition-all ${
                              active ? "bg-blue-500 text-white" : "text-gray-700"
                            }`}
                          >
                            <item.icon
                              className={`text-2xl text-primary-main ${
                                active ? "text-white" : "text-gray-400"
                              }`}
                            />
                            {item.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                )}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </header>
  );
};

export default Navbar;
