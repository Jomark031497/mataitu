import type { ComponentType, HTMLAttributes, ReactNode } from "react";

interface Props {
  children: ReactNode;
  as?: string;
  className?: string;
}

const Container = ({ children, as = "section", className }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: ComponentType<HTMLAttributes<HTMLDivElement>> = as as any;

  return <Component className={`0 mx-auto max-w-md p-4 ${className || ""}`}>{children}</Component>;
};

export default Container;
