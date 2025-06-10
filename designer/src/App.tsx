import React, { useState } from 'react';
import { BuildingsProvider } from './BuildingsContext';
import Canvas, { BuildingInstance, GhostPlacement } from './Canvas';
import Sidebar from './Sidebar';
import Inspector from './Inspector';
import "./App.css";
import { Types } from './types';

const TILE_SIZE = 32;

export default function App() {
  const [items, setItems] = useState<BuildingInstance[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ghostType, setGhostType] = useState<keyof Types | null>(null);
  const [ghost, setGhost] = useState<GhostPlacement | null>(null);

  const selected = items.find(i => i.id === selectedId) || null;

  const handleSelectType = (t: keyof Types | null) => {
    setGhostType(t);
    setGhost(t ? { type: t, x: 0, y: 0 } : null);
  };

  return (
    <BuildingsProvider>
      <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar active={ghostType} onSelect={handleSelectType} />
        <Canvas
          items={items}
          setItems={setItems}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          ghost={ghost}
          tileSize={TILE_SIZE}
        />
        <Inspector
          building={selected}
          onChange={b => setItems(prev => prev.map(it => it.id === b.id ? b : it))}
        />
      </div>
    </BuildingsProvider>
  );
}
