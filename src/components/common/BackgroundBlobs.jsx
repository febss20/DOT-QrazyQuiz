export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl opacity-40 mix-blend-screen" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-3xl opacity-40" />
    </div>
  );
}
