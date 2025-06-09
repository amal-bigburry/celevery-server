import { getCurrentDayName } from './getCurrentDayName';
import { getCurrentMilitaryTime } from './getCurrentMilterytime';

function parseMilitaryTimeToMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

export function isStoreOpen(openTime: string, closeTime: string): boolean {
  const currentTime = getCurrentMilitaryTime();
  const nowMinutes = parseMilitaryTimeToMinutes(currentTime);
  const openMinutes = parseMilitaryTimeToMinutes(openTime);
  const closeMinutes = parseMilitaryTimeToMinutes(closeTime);

  if (closeMinutes > openMinutes) {
    return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
  } else {
    // Overnight case (e.g., 22:00 to 06:00)
    return nowMinutes >= openMinutes || nowMinutes < closeMinutes;
  }
}
