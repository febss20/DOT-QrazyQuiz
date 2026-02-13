export default function StickyFooter({ children }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-dark/95 backdrop-blur-md border-t border-surface-border z-40">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {children}
      </div>
    </div>
  );
}
