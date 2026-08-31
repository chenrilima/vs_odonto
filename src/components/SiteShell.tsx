"use client";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./Header";
import { BookingModal } from "./Booking";
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState(false);
  const close = useCallback(() => setBooking(false), []);
  useEffect(() => {
    const open = () => setBooking(true);
    window.addEventListener("open-booking", open);
    return () => window.removeEventListener("open-booking", open);
  }, []);
  return (
    <>
      <Header onBooking={() => setBooking(true)} />
      {children}
      <button
        className="whatsapp-float"
        aria-label="Agendar avaliação pelo WhatsApp"
        onClick={() => setBooking(true)}
      >
        <span aria-hidden="true">W</span>
        <b>Agendar</b>
      </button>
      <BookingModal open={booking} onClose={close} />
    </>
  );
}
