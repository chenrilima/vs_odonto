"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { BookingModal } from "./Booking";
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState(false);
  const [bookingInterest, setBookingInterest] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const close = useCallback(() => {
    setBooking(false);
    setBookingInterest("");
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);
  const openBooking = useCallback((interest = "") => {
    lastTrigger.current = document.activeElement as HTMLElement | null;
    setBookingInterest(interest);
    setBooking(true);
  }, []);
  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<{ interest?: string }>).detail;
      openBooking(detail?.interest ?? "");
    };
    window.addEventListener("open-booking", open);
    return () => window.removeEventListener("open-booking", open);
  }, [openBooking]);
  return (
    <>
      <div data-app-shell inert={booking || menuOpen ? true : undefined}>
        <Header onBooking={() => openBooking()} onMenuChange={setMenuOpen} />
        {children}
        <button
          className="whatsapp-float"
          aria-label="Agendar avaliação pelo WhatsApp"
          onClick={() => openBooking()}
        >
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.208-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.84 9.84 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.83 9.83 0 0 1-1.51-5.26c.002-5.446 4.433-9.875 9.883-9.875 2.639 0 5.12 1.029 6.984 2.895a9.825 9.825 0 0 1 2.893 6.988c-.003 5.446-4.434 9.885-9.877 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.303-1.654a11.88 11.88 0 0 0 5.686 1.448h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
            </svg>
          </span>
          <b>Agendar</b>
        </button>
      </div>
      {booking && (
        <BookingModal open initialInterest={bookingInterest} onClose={close} />
      )}
    </>
  );
}
