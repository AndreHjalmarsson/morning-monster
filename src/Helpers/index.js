import Svg, { G, Path } from 'react-native-svg';

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
    new Date(wakePushDate.getFullYear(), wakePushDate.getMonth(), wakePushDate.getDate(), wakeTimeH, wakeTimeM, 0, 0) -
    wakePushDate;

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

export const BEDTIME_ICON = (
  <G scale="1.3">
    <Path d="M11.7,10.5c-3.6,0-6.4-2.9-6.4-6.4c0-0.7,0.1-1.4,0.4-2.1C3.1,2.9,1.2,5.3,1.2,8.1c0,3.6,2.9,6.4,6.4,6.4
      c2.8,0,5.2-1.8,6.1-4.4C13.1,10.4,12.4,10.5,11.7,10.5z" />
  </G>
);

export const WAKETIME_ICON = (
  <G scale="0.6">
    <Path d="M22.58,11.269c-6.237,0-11.311,5.075-11.311,11.312s5.074,11.312,11.311,11.312c6.236,0,11.311-5.074,11.311-11.312
			S28.816,11.269,22.58,11.269z" />
    <G>
      <G>
        <Path d="M22.58,7.944c-1.219,0-2.207-0.988-2.207-2.206V2.207C20.373,0.988,21.361,0,22.58,0c1.219,0,2.207,0.988,2.207,2.207
					v3.531C24.787,6.956,23.798,7.944,22.58,7.944z" />
      </G>
      <G>
        <Path d="M22.58,37.215c-1.219,0-2.207,0.988-2.207,2.207v3.53c0,1.22,0.988,2.208,2.207,2.208c1.219,0,2.207-0.988,2.207-2.208
					v-3.53C24.787,38.203,23.798,37.215,22.58,37.215z" />
      </G>
      <G>
        <Path d="M32.928,12.231c-0.861-0.862-0.861-2.259,0-3.121l2.497-2.497c0.861-0.861,2.259-0.861,3.121,0
					c0.862,0.862,0.862,2.26,0,3.121l-2.497,2.497C35.188,13.093,33.791,13.093,32.928,12.231z" />
      </G>
      <G>
        <Path d="M12.231,32.93c-0.862-0.863-2.259-0.863-3.121,0l-2.497,2.496c-0.861,0.861-0.862,2.26,0,3.121
					c0.862,0.861,2.26,0.861,3.121,0l2.497-2.498C13.093,35.188,13.093,33.79,12.231,32.93z" />
      </G>
      <G>
        <Path d="M37.215,22.58c0-1.219,0.988-2.207,2.207-2.207h3.531c1.219,0,2.207,0.988,2.207,2.207c0,1.219-0.988,2.206-2.207,2.206
					h-3.531C38.203,24.786,37.215,23.799,37.215,22.58z" />
      </G>
      <G>
        <Path d="M7.944,22.58c0-1.219-0.988-2.207-2.207-2.207h-3.53C0.988,20.373,0,21.361,0,22.58c0,1.219,0.988,2.206,2.207,2.206
					h3.531C6.956,24.786,7.944,23.799,7.944,22.58z" />
      </G>
      <G>
        <Path d="M32.928,32.93c0.862-0.861,2.26-0.861,3.121,0l2.497,2.497c0.862,0.86,0.862,2.259,0,3.12s-2.259,0.861-3.121,0
					l-2.497-2.497C32.066,35.188,32.066,33.791,32.928,32.93z" />
      </G>
      <G>
        <Path d="M12.231,12.231c0.862-0.862,0.862-2.259,0-3.121L9.734,6.614c-0.862-0.862-2.259-0.862-3.121,0
					c-0.862,0.861-0.862,2.259,0,3.12l2.497,2.497C9.972,13.094,11.369,13.094,12.231,12.231z" />
      </G>
    </G>
  </G>
);
