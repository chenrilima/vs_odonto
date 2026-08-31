"use client";

export function BookingTrigger({
  className = "button",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
    >
      {children}
    </button>
  );
}
