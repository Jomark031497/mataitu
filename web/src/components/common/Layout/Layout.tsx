import { Navbar } from "@/components/common";
import { Container } from "@/components/ui";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-gray-100">
      <Navbar />
      <Container component="main">{children}</Container>
    </div>
  );
};

export default Layout;
