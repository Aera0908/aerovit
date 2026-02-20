interface InterventionAlertProps {
  type: string;
  message: string;
}

export function InterventionAlert({ type, message }: InterventionAlertProps) {
  return (
    <div className="p-4 bg-zinc-950 border-l-4 border-cyan-500">
      <p className="text-xs text-cyan-400 font-mono mb-1">{type}</p>
      <p className="text-sm text-white">{message}</p>
    </div>
  );
}
