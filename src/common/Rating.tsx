import React from 'react';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import ReactRating from 'react-rating';

export default function Rating({
  value,
  className = '',
  max = 10,
}: {
  value: number;
  className?: string;
  max?: number;
}) {
  const divider = max / 5;
  const formattedValue = value / divider;

  return (
    <ReactRating
      readonly
      className={'rating ' + className}
      initialRating={formattedValue}
      fractions={2}
      fullSymbol={<Icon icon={IconNames.STAR} color="gold" />}
      emptySymbol={<Icon icon={IconNames.STAR_EMPTY} color="gold" />}
    />
  );
}
