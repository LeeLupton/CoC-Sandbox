import React, { useState } from 'react';
import { BuildingInstance } from './Canvas';

interface Props {
  items: BuildingInstance[];
  setItems: React.Dispatch<React.SetStateAction<BuildingInstance[]>>;
}

export default function LayoutTools({ items, setItems }: Props) {
  const [code, setCode] = useState('');

  const copy = async () => {
    try {
      const res = await fetch('/layout/encode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      const data = await res.json();
      await navigator.clipboard.writeText(data.string);
      alert('Layout code copied');
    } catch (err) {
      alert('Failed to copy layout');
    }
  };

  const paste = async () => {
    try {
      const res = await fetch('/layout/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ string: code }),
      });
      const data = await res.json();
      setItems(data);
    } catch (err) {
      alert('Failed to load layout');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button className="px-2 py-1 border" onClick={copy}>Copy layout code</button>
      <input
        className="border px-1 py-0.5"
        placeholder="Paste code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button className="px-2 py-1 border" onClick={paste}>Load</button>
    </div>
  );
}
