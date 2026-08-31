"use client";

export function BookingTrigger({
  className = "button",
  children,
  interest,
}: {
  className?: string;
  children: React.ReactNode;
  interest?: string;
}) {
  return (
    <button
      className={className}
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("open-booking", { detail: { interest } }),
        )
      }
    >
      {children}
    </button>
  );
}
