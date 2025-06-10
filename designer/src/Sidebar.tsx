import React, { useContext } from 'react';
import { BuildingsContext } from './BuildingsContext';
import { Types } from './types';

interface Props {
  active: keyof Types | null;
  onSelect: (t: keyof Types | null) => void;
}

export default function Sidebar({ active, onSelect }: Props) {
  const { buildings } = useContext(BuildingsContext);
  if (!buildings) return <div className="sidebar">Loading...</div>;

  const names = Object.keys(buildings) as Array<keyof Types>;
  return (
    <div className="sidebar">
      {names.map(n => (
        <div
          key={n}
          onClick={() => onSelect(active === n ? null : n)}
          style={{ padding: '4px', cursor: 'pointer', background: active === n ? '#ddd' : undefined }}
        >
          {n}
        </div>
      ))}
    </div>
  );
}
