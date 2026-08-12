"use client";

import { useSyncExternalStore } from "react";

import { getCurrentMonth } from "@/lib/experience";

function subscribeToMonth(callback: () => void) {
  // Hourly checks are inexpensive and cover long-lived tabs crossing a month boundary.
  const intervalId = window.setInterval(callback, 60 * 60 * 1000);
  window.addEventListener("focus", callback);

  return () => {
    window.clearInterval(intervalId);
    window.removeEventListener("focus", callback);
  };
}

function getServerMonth() {
  // An empty snapshot prevents a statically built page from freezing an old month.
  return "";
}

export function useCurrentMonth() {
  return useSyncExternalStore(subscribeToMonth, getCurrentMonth, getServerMonth);
}
