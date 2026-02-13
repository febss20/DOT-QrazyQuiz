export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm flex items-center gap-2">
      <span className="material-icons text-base">error_outline</span>
      {message}
    </div>
  );
}
