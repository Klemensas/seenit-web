import React from 'react';
import { useUserQuery, useUserDataQuery } from '../graphql';
import Seen from '../common/Seen';

export default function Dashboard() {
  const { data: localUser } = useUserDataQuery();
  const userData = localUser?.userData;
  const { loading, data, error, fetchMore } = useUserQuery({
    variables: { id: userData?.id },
  });

  if (!userData) return null;
  if (!data?.user?.watched) return null;

  const {
    watched: { hasMore, watched },
  } = data.user;

  console.error('www', watched);

  return (
    <>
      <h1>Hello, this is your dashboard</h1>
      <div>
        <h2>Automatically tracked shows</h2>
        <h2>Your last seen</h2>
        <div className="grid grid-4">
          {watched.map(({ id, item, createdAt }) => (
            <Seen key={id} item={item} date={createdAt} />
          ))}
        </div>
      </div>
    </>
  );
}
