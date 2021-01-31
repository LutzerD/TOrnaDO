import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

// ref: https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
export const Stopwatch = (props) => {
  const [seconds, setSeconds] = useState(60 * 60 + 60 * 4 + 20);
  const [timestamp, setTimestamp] = useState("");

  function removeFactor(seconds, factor) {
    let time = seconds / factor;
    time = time - (time % 1);
    let remainingSeconds = seconds - time * factor;
    return [time, remainingSeconds];
  }

  function twoDigitNumber(number) {
    let numberStr = number + "";
    if (numberStr.length < 2) numberStr = "0" + numberStr;
    return numberStr;
  }

  function formatTime() {
    let tempSeconds = seconds,
      hours,
      minutes;

    [hours, tempSeconds] = removeFactor(tempSeconds, 60 * 60);
    [minutes, tempSeconds] = removeFactor(tempSeconds, 60);
    [tempSeconds] = removeFactor(tempSeconds, 1);

    setTimestamp(
      [
        twoDigitNumber(hours),
        twoDigitNumber(minutes),
        twoDigitNumber(tempSeconds),
      ].join(":")
    );
  }

  useEffect(() => {
    formatTime();
    let interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      formatTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return <Text>{timestamp}</Text>;
};
