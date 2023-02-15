import React from 'react';

const Currency: React.FC<{ priceInCents: number }> = ({ priceInCents }) => (
  <>
    {(priceInCents / 100).toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
    })}
  </>
);

export default Currency;
