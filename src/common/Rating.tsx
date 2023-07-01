import React from 'react';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import ReactRating from 'react-rating';

export enum RatingSize {
  Small = 'small',
}

export default function Rating({
  value,
  className = '',
  max = 10,
  size,
}: {
  value: number;
  className?: string;
  max?: number;
  size?: RatingSize;
}) {
  const divider = max / 5;
  const formattedValue = value / divider;
  const iconSize = size === RatingSize.Small ? 12 : undefined;

  return (
    <ReactRating
      readonly
      className={`rating rating-${size}` + className}
      initialRating={formattedValue}
      fractions={2}
      fullSymbol={
        <Icon icon={IconNames.STAR} iconSize={iconSize} color="gold" />
      }
      emptySymbol={
        <Icon icon={IconNames.STAR_EMPTY} iconSize={iconSize} color="gold" />
      }
    />
  );
}
