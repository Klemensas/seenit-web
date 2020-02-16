import React, { ReactChildren, ReactChild } from 'react';
import classNames from 'classnames';
import {
  Dialog,
  Classes,
  Button,
  Icon,
  IOverlayProps,
  Intent,
  MaybeElement,
  IconName,
} from '@blueprintjs/core';

export default function BlockingAlert({
  canEscapeKeyCancel = false,
  canOutsideClickCancel = false,
  confirmButtonText = 'Ok',
  cancelButtonText,
  onConfirm,
  onCancel,
  isLoading = false,
  className = '',
  intent,
  icon,
  children,
  ...overlayProps
}: {
  isOpen: boolean;
  canEscapeKeyCancel?: boolean;
  canOutsideClickCancel?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: (event: React.MouseEvent) => void;
  onCancel?: (event?: React.SyntheticEvent) => void;
  isLoading?: boolean;
  className?: string;
  intent?: Intent;
  icon?: IconName | MaybeElement;
  children?: ReactChild;
  overlayProps?: IOverlayProps;
}) {
  return (
    <Dialog
      {...overlayProps}
      className={classNames(Classes.ALERT, className)}
      canEscapeKeyClose={canEscapeKeyCancel && !isLoading}
      canOutsideClickClose={canOutsideClickCancel && !isLoading}
      onClose={onCancel}
    >
      <div className={Classes.ALERT_BODY}>
        <Icon icon={icon} iconSize={40} intent={intent} />
        <div className={Classes.ALERT_CONTENTS}>{children}</div>
      </div>
      <div className={Classes.ALERT_FOOTER}>
        <Button
          intent={intent}
          text={confirmButtonText}
          onClick={onConfirm}
          loading={isLoading}
          disabled={isLoading}
        />
        {cancelButtonText && (
          <Button
            text={cancelButtonText}
            onClick={onCancel}
            disabled={isLoading}
          />
        )}
      </div>
    </Dialog>
  );
}
