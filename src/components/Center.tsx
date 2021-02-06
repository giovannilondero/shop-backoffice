import { PropsWithChildren } from 'react';

export default function Center({ children }: PropsWithChildren<{}>) {
  return <div className="center">{children}</div>;
}
