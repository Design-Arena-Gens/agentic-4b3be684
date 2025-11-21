import type { ReactNode } from "react";

export function Section({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold">{title}</h3>
        {actions}
      </div>
      <div className="prose prose-slate max-w-none mt-3">
        {children}
      </div>
    </section>
  );
}

