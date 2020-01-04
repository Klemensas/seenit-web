import React from 'react';
import { Link } from 'react-router-dom';
import { H1, H2, H3, Button } from '@blueprintjs/core';

import chromeSvg from './assets/logos/chrome.svg';
import vlcSvg from './assets/logos/vlc.svg';

export default function Home() {
  return (
    <div className="hero-box bp3-dark">
      <H1>Automatically track what you've watched</H1>
      <H2 className="pt-3">Start tracking</H2>
      <div className="py-4">
        <Button large fill className="my-4">Join seen it</Button>
        <Button large fill className="my-4">
          <Link to={`/setup`}>Download for your used platforms</Link>
        </Button>
      </div>
      <div>
        <H3 className="pb-2">Currently works with</H3>
        <div>
          <img className="mx-3" style={{ width: 48 }} alt="Chrome" src={chromeSvg} />
          <img className="mx-3" style={{ height: 48 }} alt="VLC" src={vlcSvg} />
        </div>
      </div>
    </div>
  )
}