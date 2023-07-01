import { SyntheticEvent } from 'react';

export const preventBubbling = <T extends SyntheticEvent>(
  cb?: (event: T) => void,
) => (event: T) => {
  event.stopPropagation();
  cb?.(event);
};

let container: HTMLElement | undefined;

export const getAppContainer = () =>
  container || (container = document.getElementById('app-main') || undefined);
