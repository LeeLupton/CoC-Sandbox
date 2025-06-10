import React, { useState, useRef } from 'react';
import { BuildingsProvider } from './BuildingsContext';
import Canvas, { BuildingInstance, GhostPlacement } from './Canvas';
import Sidebar from './Sidebar';
import Inspector from './Inspector';
import ExportDialog from './ExportDialog';
import LayoutTools from './LayoutTools';
import "./App.css";
import { Types } from './types';

const TILE_SIZE = 32;

export default function App() {
  const [items, setItems] = useState<BuildingInstance[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ghostType, setGhostType] = useState<keyof Types | null>(null);
  const [ghost, setGhost] = useState<GhostPlacement | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showRanges, setShowRanges] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [pixelRatio, setPixelRatio] = useState(1);
  const stageRef = useRef<any>(null);

  const selected = items.find(i => i.id === selectedId) || null;

  const handleSelectType = (t: keyof Types | null) => {
    setGhostType(t);
    setGhost(t ? { type: t, x: 0, y: 0 } : null);
  };

  const handleExport = () => {
    const uri = stageRef.current?.toDataURL({ pixelRatio });
    if (uri) {
      const a = document.createElement('a');
      a.href = uri;
      a.download = 'layout.png';
      a.click();
    }
    setExportOpen(false);
  };

  return (
    <BuildingsProvider>
      <div className="flex flex-col h-full w-full">
        <div className="p-2 flex items-center space-x-2 border-b">
          <button className="px-2 py-1 border" onClick={() => setExportOpen(true)}>Export PNG</button>
          <LayoutTools items={items} setItems={setItems} />
          <button className="ml-auto px-2 py-1 border" onClick={() => setShowSidebar(!showSidebar)}>{showSidebar ? 'Hide' : 'Show'} Palette</button>
          <button className="px-2 py-1 border" onClick={() => setShowInspector(!showInspector)}>{showInspector ? 'Hide' : 'Show'} Inspector</button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {showSidebar && <Sidebar active={ghostType} onSelect={handleSelectType} />}
          <div className="flex-1 flex justify-center items-center">
            <Canvas
              stageRef={stageRef}
              items={items}
              setItems={setItems}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              ghost={ghost}
              tileSize={TILE_SIZE}
              showGrid={showGrid}
              showRanges={showRanges}
            />
          </div>
          {showInspector && (
            <Inspector
              building={selected}
              onChange={b => setItems(prev => prev.map(it => it.id === b.id ? b : it))}
            />
          )}
        </div>
        <ExportDialog
          open={exportOpen}
          options={{ grid: showGrid, ranges: showRanges, pixelRatio }}
          setOptions={o => { setShowGrid(o.grid); setShowRanges(o.ranges); setPixelRatio(o.pixelRatio); }}
          onExport={handleExport}
          onClose={() => setExportOpen(false)}
        />
      </div>
    </BuildingsProvider>
  );
}
