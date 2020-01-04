import React from 'react';
import { Icon } from "@blueprintjs/core";
import { IconNames } from '@blueprintjs/icons';
import ReactRating from 'react-rating';

export default function Rating({ value }: { value: number }) {
  return (
    <ReactRating
      readonly
      className="rating"
      initialRating={value}
      fractions={10}
      fullSymbol={<Icon icon={IconNames.STAR} color="gold" />}
      emptySymbol={<Icon icon={IconNames.STAR_EMPTY} color="gold" />}
    />
  )
}