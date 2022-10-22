import React from 'react';

const Authenticated: React.FC<Props> = ({ isTransparent = false }) => {
  return <div>Authenticated</div>;
};

type Props = {
  isTransparent?: boolean;
};

export default Authenticated;
