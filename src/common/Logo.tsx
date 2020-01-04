import React from 'react';

import { ReactComponent as Eyes} from '../assets/logos/eyes.svg';

export enum LogoSize {
  text,
  textLarge,
  logo,
  large,
}

const sizes = {
  [LogoSize.text]: [14, 12, '0 1px'],
  [LogoSize.textLarge]: [16, 14, '1px 1px 0 2px'],
  [LogoSize.logo]: [18, 16, '1px 1px 0'],
  [LogoSize.large]: [24, 19, '1px 1px 0 2px'],
}

export function Logo({ size } = { size: LogoSize.logo }) {
  const [logoSize, eyeSize, eyePadding] = sizes[size]

  return (
    <div className="seenit-logo" style={{ fontSize: logoSize }}>
      S
      <Eyes className="logo-eyes" style={{ height: eyeSize, padding: eyePadding }} />
      N&nbsp;IT
    </div>
  );
}

Logo.defaultProps  = {
  size: LogoSize.logo,
}
