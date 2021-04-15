import React, { ReactNode } from 'react';

import { useIsExtensionCheckDoneQuery } from './graphql';

const ExtensionSetupBlocker = ({ children }: { children: ReactNode }) => {
  const { data } = useIsExtensionCheckDoneQuery();

  return data?.isExtensionCheckDone ? <>{children}</> : null;
};

export default ExtensionSetupBlocker;
