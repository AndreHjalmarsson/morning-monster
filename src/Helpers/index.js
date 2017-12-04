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

export function startPushNotificationTimer(wakeTimeH, wakeTimeM) {
  let now = new Date();
  let timeTillWake =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      wakeTimeH,
      wakeTimeM,
      0,
      0
    ) - now;

  if (timeTillWake < 0) {
    timeTillWake += 86400000;
  }

  return timeTillWake;
}
