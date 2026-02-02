type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="space-y-1 mb-4">
      <h2 className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}