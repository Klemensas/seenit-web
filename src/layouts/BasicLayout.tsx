import React, { ReactNode } from 'react';

export default function BasicLayout({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}
