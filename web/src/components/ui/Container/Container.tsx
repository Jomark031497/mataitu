import type { ComponentType, HTMLAttributes, ReactNode } from "react";

interface Props {
  children: ReactNode;
  component?: string;
}

const Container = ({ children, component = "section" }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: ComponentType<HTMLAttributes<HTMLDivElement>> = component as any;

  return <Component className={`0 mx-auto max-w-md p-4`}>{children}</Component>;
};

export default Container;
