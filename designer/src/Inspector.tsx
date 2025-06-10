import React from 'react';
import { BuildingInstance } from './Canvas';

interface Props {
  building: BuildingInstance | null;
  onChange: (b: BuildingInstance) => void;
}

export default function Inspector({ building, onChange }: Props) {
  if (!building) return <div className="inspector">Select a building</div>;

  return (
    <div className="inspector" style={{ padding: '8px' }}>
      <div>
        Level:
        <input
          type="range"
          min={1}
          max={10}
          value={building.level}
          onChange={e => onChange({ ...building, level: parseInt(e.target.value, 10) })}
        />
      </div>
      <div>
        Rotation:
        <input
          type="number"
          value={building.rotation}
          onChange={e => onChange({ ...building, rotation: parseInt(e.target.value, 10) })}
        />
      </div>
    </div>
  );
}
