import { cn } from "@/lib/utils";

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn(`text-sm font-semibold text-[#93a8be] dark:text-[#7a8fa0] uppercase tracking-widest mb-4`, className)}>
      {children}
    </h2>
  );
};

export default CardTitle;