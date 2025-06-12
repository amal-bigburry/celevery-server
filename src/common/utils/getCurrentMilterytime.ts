import moment from "moment-timezone";


export function getCurrentMilitaryTime(): string {
  const storeTimeZone = 'Asia/Kolkata';
  const storeLocalTime = moment().tz(storeTimeZone);
  return storeLocalTime.format('HH:mm'); // 24-hour format
}