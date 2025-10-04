export const timeToDisplay = (timeString: string): string | null => {
  if (!timeString || typeof timeString !== "string") return null;

  try {
    const [hh, mm] = timeString.split(":").map(Number);

    if (isNaN(hh) || isNaN(mm)) return null;

    let hours = hh;
    const minutes = String(mm).padStart(2, "0");

    const suffix = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12; // midnight or noon case

    return `${hours}:${minutes} ${suffix}`;
  } catch {
    return null;
  }
};

export function timeFormatForScheduleCreation(
  timeString: string
): string | null {
  if (!timeString || typeof timeString !== "string") {
    return null; // no value
  }

  try {
    // Trim and split
    const normalized = timeString.replace(/\s+/g, " ").trim();

    const parts = normalized.trim().split(" ");
    if (parts.length !== 2) return null; // must have "time" + "AM/PM"

    const [time, modifier] = parts; // e.g. "8:30", "PM"
    let [hoursStr, minutesStr] = time.split(":");

    if (!hoursStr || !minutesStr) return null;

    let hours = Number(hoursStr);
    let minutes = Number(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) return null;
    if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;

    // Convert to 24-hour format
    if (modifier.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    }
    if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = "00";

    return `${hh}:${mm}:${ss}`;
  } catch {
    return null; // invalid format
  }
}

export function formatAttendanceDate(timestamp: Date) {
  const dateObj = new Date(timestamp);

  const options = {
    timeZone: "Asia/Manila",
    locale: "en-US", // Use English locale for month abbreviation (MMM)
  };

  // Get month abbreviation (MMM)
  const month = dateObj.toLocaleDateString("en-US", {
    ...options,
    month: "short",
  });

  // Get day (DD) and ensure two digits
  const day = dateObj.toLocaleDateString("en-US", {
    ...options,
    day: "2-digit",
  });

  // Get year (YYYY)
  const year = dateObj.toLocaleDateString("en-US", {
    ...options,
    year: "numeric",
  });

  return `${month} ${day} ${year}`;
}

export function formatAttendanceTime(timestamp: Date) {
  const dateObj = new Date(timestamp);

  // Options for 12-hour format with hours, minutes, and AM/PM
  const options = {
    hour: "numeric" as const,
    minute: "2-digit" as const,
    hour12: true,
    timeZone: "Asia/Manila",
  };

  // The locale ('en-US') ensures 'AM'/'PM' are used.
  return dateObj.toLocaleTimeString("en-US", options);
}
