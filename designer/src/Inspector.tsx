import React, { useContext } from 'react';
import { BuildingsContext } from './BuildingsContext';
import { BuildingInstance } from './Canvas';

interface Props {
  building: BuildingInstance | null;
  onChange: (b: BuildingInstance) => void;
}

export default function Inspector({ building, onChange }: Props) {
  const { buildings } = useContext(BuildingsContext);
  if (!building) return <div className="inspector p-2">Select a building</div>;

  let dps: number | undefined;
  const info: any = (buildings as any)?.[building.type];
  if (info?.levels) {
    const lvl = info.levels.find((l: any) => l.level === building.level);
    dps = lvl?.dps;
  }

  return (
    <div className="inspector p-2 space-y-2">
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
      {dps !== undefined && <div>DPS: {dps}</div>}
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
