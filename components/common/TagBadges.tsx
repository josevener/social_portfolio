type Props = {
  tags?: string[];
};

export default function TagBadges({ tags }: Props) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="
            text-xs
            rounded-full
            bg-primary/10
            text-primary
            px-3 py-1
          "
        >
          {tag}
        </span>
      ))}
    </div>
  );
}