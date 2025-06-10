import React from 'react';

interface Props {
  open: boolean;
  options: {
    grid: boolean;
    ranges: boolean;
    pixelRatio: number;
  };
  setOptions: (o: Props['options']) => void;
  onExport: () => void;
  onClose: () => void;
}

export default function ExportDialog({ open, options, setOptions, onExport, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow w-64 space-y-2">
        <h2 className="text-lg font-semibold mb-2">Export PNG</h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.grid}
            onChange={e => setOptions({ ...options, grid: e.target.checked })}
          />
          <span>Gridlines</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.ranges}
            onChange={e => setOptions({ ...options, ranges: e.target.checked })}
          />
          <span>Range Circles</span>
        </label>
        <div className="flex items-center space-x-2">
          <span>Size:</span>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              checked={options.pixelRatio === 1}
              onChange={() => setOptions({ ...options, pixelRatio: 1 })}
            />
            <span>1×</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              checked={options.pixelRatio === 2}
              onChange={() => setOptions({ ...options, pixelRatio: 2 })}
            />
            <span>2×</span>
          </label>
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <button className="px-2 py-1 border" onClick={onClose}>Cancel</button>
          <button className="px-2 py-1 border" onClick={onExport}>Export</button>
        </div>
      </div>
    </div>
  );
}
