const SectionLabel = ({ number, label }: { number: string; label: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="text-primary font-mono text-sm">{number}</span>
    <div className="h-px w-12 bg-primary/40" />
    <span className="label-text text-primary">{label}</span>
  </div>
);

export default SectionLabel;
