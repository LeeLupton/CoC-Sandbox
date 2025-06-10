import React from 'react';
import { Stage, Layer, Line, Rect, Group } from 'react-konva';
import { Types } from './types';

export interface BuildingInstance {
  id: number;
  type: keyof Types;
  x: number;
  y: number;
  level: number;
  rotation: number;
}

export interface GhostPlacement {
  type: keyof Types;
  x: number;
  y: number;
}

interface Props {
  items: BuildingInstance[];
  setItems: React.Dispatch<React.SetStateAction<BuildingInstance[]>>;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  ghost: GhostPlacement | null;
  tileSize: number;
}

const GRID_SIZE = 20;

export default function Canvas({ items, setItems, selectedId, setSelectedId, ghost, tileSize }: Props) {
  const width = GRID_SIZE * tileSize;
  const height = GRID_SIZE * tileSize;

  const lines: JSX.Element[] = [];
  for (let i = 0; i <= GRID_SIZE; i++) {
    const pos = i * tileSize;
    lines.push(<Line key={`v${i}`} points={[pos, 0, pos, height]} stroke="#ccc" strokeWidth={1} />);
    lines.push(<Line key={`h${i}`} points={[0, pos, width, pos]} stroke="#ccc" strokeWidth={1} />);
  }

  const handleDragEnd = (id: number, e: any) => {
    const { x, y } = e.target.position();
    setItems(prev => prev.map(it => it.id === id ? { ...it, x, y } : it));
  };

  const handleStageClick = (e: any) => {
    if (ghost) {
      // place ghost
      setItems(prev => [...prev, { id: Date.now(), type: ghost.type, x: ghost.x, y: ghost.y, level: 1, rotation: 0 }]);
    }
  };

  return (
    <Stage width={width} height={height} onMouseMove={e => {
      if (ghost) {
        ghost.x = Math.floor(e.evt.offsetX / tileSize) * tileSize;
        ghost.y = Math.floor(e.evt.offsetY / tileSize) * tileSize;
      }
    }} onClick={handleStageClick}>
      <Layer>{lines}</Layer>
      <Layer>
        {items.map(b => (
          <Rect
            key={b.id}
            x={b.x}
            y={b.y}
            width={tileSize}
            height={tileSize}
            fill={b.id === selectedId ? 'orange' : 'lightblue'}
            rotation={b.rotation}
            draggable
            onDragEnd={e => handleDragEnd(b.id, e)}
            onClick={() => setSelectedId(b.id)}
          />
        ))}
        {ghost && (
          <Rect
            x={ghost.x}
            y={ghost.y}
            width={tileSize}
            height={tileSize}
            fill="rgba(0,0,0,0.3)"
          />
        )}
      </Layer>
    </Stage>
  );
}
