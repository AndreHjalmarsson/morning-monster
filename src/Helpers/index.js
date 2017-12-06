export function calculateMinutesFromAngle(angle) {
  return Math.round(angle / (2 * Math.PI / (12 * 24))) * 5;
}

export function calculateHour(angle) {
  const minutes = calculateMinutesFromAngle(angle);
  const h = Math.floor(minutes / 60);

  return h;
}

export function calculateMinutes(angle) {
  const minutes = calculateMinutesFromAngle(angle);
  const h = Math.floor(minutes / 60);
  const m = minutes - h * 60;

  return m;
}

export function roundAngleToFives(angle) {
  const fiveMinuteAngle = 2 * Math.PI / 144;

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
}

export function padMinutes(min) {
  if (`${min}`.length < 2) {
    return `0${min}`;
  }

  return min;
}

export function startWakePushNotificationTimer(wakeTimeH, wakeTimeM) {
  let wakePushDate = new Date();
  let timeTillPushWake =
    new Date(
      wakePushDate.getFullYear(),
      wakePushDate.getMonth(),
      wakePushDate.getDate(),
      wakeTimeH,
      wakeTimeM,
      0,
      0
    ) - wakePushDate;

  if (timeTillPushWake < 0) {
    timeTillPushWake += 86400000;
  }

  return timeTillPushWake;
}

export function startSleepPushNotificationTimer(sleepTimeH, sleepTimeM) {
  let sleepPushDate = new Date();
  let timeTillPushSleep =
    new Date(
      sleepPushDate.getFullYear(),
      sleepPushDate.getMonth(),
      sleepPushDate.getDate(),
      sleepTimeH,
      sleepTimeM,
      0,
      0
    ) - sleepPushDate;

  if (timeTillPushSleep < 0) {
    timeTillPushSleep += 86400000;
  }

  return timeTillPushSleep;
}
