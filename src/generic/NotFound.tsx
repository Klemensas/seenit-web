import React from 'react';
import { NonIdealState, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <NonIdealState
      icon="map"
      className="p-5"
      title="Uh oh"
      description="Page not found. You sure the link is correct?"
      action={
        <Link to="/">
          <Button>Go to homepage</Button>
        </Link>
      }
    />
  );
}
