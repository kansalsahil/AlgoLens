import { ReactNode, useRef, useState, useEffect } from 'react';

interface ResizablePanelProps {
  children: ReactNode;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  side?: 'left' | 'right';
}

export function ResizablePanel({
  children,
  defaultWidth = 400,
  minWidth = 200,
  maxWidth = 800,
  side = 'left'
}: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return;

      const container = panelRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      let newWidth: number;

      if (side === 'left') {
        newWidth = e.clientX - containerRect.left;
      } else {
        newWidth = containerRect.right - e.clientX;
      }

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, minWidth, maxWidth, side]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  return (
    <div
      ref={panelRef}
      className="relative flex-shrink-0 bg-white border-r border-gray-200"
      style={{ width: `${width}px` }}
    >
      {children}

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={`absolute top-0 ${side === 'left' ? 'right-0' : 'left-0'} bottom-0 w-1 cursor-ew-resize hover:bg-blue-500 transition-colors group`}
        style={{ zIndex: 10 }}
      >
        <div className="absolute inset-y-0 -left-1 -right-1" />
      </div>
    </div>
  );
}
