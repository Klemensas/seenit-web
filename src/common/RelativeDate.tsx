import React from 'react';
import { formatDistanceStrict, format } from 'date-fns';
import { Tooltip } from '@blueprintjs/core';

export type Props = {
  date: Date | number;
  baseDate?: Date | number;
  options?: Parameters<typeof formatDistanceStrict>[2];
};

export function RelativeDate({
  date,
  baseDate = Date.now(),
  options = { addSuffix: true },
}: Props) {
  return (
    <Tooltip content={format(date, 'yyyy MMM dd, HH:mm')}>
      {formatDistanceStrict(date, baseDate, options)}
    </Tooltip>
  );
}
