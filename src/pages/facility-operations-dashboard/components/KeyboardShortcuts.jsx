import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  const shortcuts = [
    { key: 'F1', description: 'Create New Work Order', action: 'new-work-order' },
    { key: 'F2', description: 'View All Alerts', action: 'view-alerts' },
    { key: 'F3', description: 'Quick Search', action: 'search' },
    { key: 'F4', description: 'Emergency Response', action: 'emergency' },
    { key: 'Ctrl+K', description: 'Command Palette', action: 'command' },
    { key: 'Ctrl+/', description: 'Show Shortcuts', action: 'shortcuts' },
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e?.ctrlKey || e?.metaKey) && e?.key === '/') {
        e?.preventDefault();
        setIsVisible((prev) => !prev);
      }

      if (e?.key === 'Escape') {
        setIsVisible(false);
      }

      if (e?.key === 'F1') {
        e?.preventDefault();
        console.log('F1: Create New Work Order');
      }
      if (e?.key === 'F2') {
        e?.preventDefault();
        console.log('F2: View All Alerts');
      }
      if (e?.key === 'F3') {
        e?.preventDefault();
        console.log('F3: Quick Search');
      }
      if (e?.key === 'F4') {
        e?.preventDefault();
        console.log('F4: Emergency Response');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 left-6 flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg hover:shadow-xl transition-all duration-150 z-40"
        aria-label="Show keyboard shortcuts"
      >
        <Icon name="Keyboard" size={18} color="var(--color-muted-foreground)" />
        <span className="text-xs text-muted-foreground">Ctrl+/</span>
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
        onClick={() => setIsVisible(false)}
        aria-hidden="true"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-lg shadow-xl z-50 animation-fade-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded hover:bg-muted transition-colors"
            aria-label="Close shortcuts"
          >
            <Icon name="X" size={20} color="var(--color-muted-foreground)" />
          </button>
        </div>
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
          {shortcuts?.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="text-sm text-foreground">{shortcut?.description}</span>
              <kbd className="px-2 py-1 text-xs font-mono font-medium bg-muted border border-border rounded">
                {shortcut?.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default KeyboardShortcuts;