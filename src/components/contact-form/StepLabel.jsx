export default function StepLabel({ number, label, icon: Icon, color = "cyan" }) {
  const colors = {
    cyan: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    purple: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    pink: "text-pink-400 border-pink-400/30 bg-pink-400/10",
  };

  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border ${colors[color]}`}
      >
        {number}
      </span>
      <label className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] ${colors[color].split(" ")[0]}`}>
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </label>
    </div>
  );
}
