import React, { useContext } from 'react';
import { BuildingsContext } from './BuildingsContext';
import { Types } from './types';

interface Props {
  active: keyof Types | null;
  onSelect: (t: keyof Types | null) => void;
}

export default function Sidebar({ active, onSelect }: Props) {
  const { buildings } = useContext(BuildingsContext);
  if (!buildings) return <div className="sidebar p-2">Loading...</div>;

  const names = Object.keys(buildings) as Array<keyof Types>;
  return (
    <div className="sidebar overflow-y-auto p-2 border-r" style={{ width: 150 }}>
      {names.map(n => (
        <div
          key={n}
          className={`cursor-pointer p-1 ${active === n ? 'bg-gray-300' : ''}`}
          onClick={() => onSelect(active === n ? null : n)}
        >
          {n}
        </div>
      ))}
    </div>
  );
}
