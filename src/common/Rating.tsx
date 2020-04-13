import React from 'react';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import ReactRating from 'react-rating';

export default function Rating({
  value,
  className = '',
}: {
  value: number;
  className?: string;
}) {
  return (
    <ReactRating
      readonly
      className={'rating ' + className}
      initialRating={value}
      fractions={2}
      fullSymbol={<Icon icon={IconNames.STAR} color="gold" />}
      emptySymbol={<Icon icon={IconNames.STAR_EMPTY} color="gold" />}
    />
  );
}
