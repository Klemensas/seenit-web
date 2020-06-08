import { SyntheticEvent } from 'react';

export const preventBubbling = <T extends SyntheticEvent>(
  cb: (event: T) => void,
) => (event: T) => {
  event.stopPropagation();
  cb(event);
};
