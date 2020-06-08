import React, { ReactNode } from 'react';
import { Intent } from '@blueprintjs/core';

import BlockingAlert from '../common/BlockingAlert';

export default function DeleteConfirmation({
  title,
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}: {
  title: ReactNode;
  isOpen: boolean;
  isLoading?: boolean;
  onCancel: any;
  onConfirm: any;
}) {
  return (
    <BlockingAlert
      cancelButtonText="Cancel"
      confirmButtonText="Remove"
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen || false}
      isLoading={isLoading}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      {title}
    </BlockingAlert>
  );
}
