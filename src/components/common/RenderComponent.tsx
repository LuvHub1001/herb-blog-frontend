import { ReactNode } from "react";

interface RenderProps<T> {
  className: string;
  items: T[];
  render: (item: T) => ReactNode;
}

function RenderComponent<T>({ className, items, render }: RenderProps<T>) {
  return (
    items.length > 0 && (
      <div className={className}>
        {items.map((item: T, idx: number) => {
          return <div key={idx}>{render(item)}</div>;
        })}
      </div>
    )
  );
}

export default RenderComponent;
