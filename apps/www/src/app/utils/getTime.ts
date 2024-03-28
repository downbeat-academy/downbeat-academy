const getTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsCount = seconds % 60;
  const remainingSeconds = (seconds % 60) < 10 ? 0 + seconds % 60 : seconds % 60;
  const totalTime = `${minutes}:${secondsCount < 10 ? '0' : ''}${remainingSeconds}`;
  const totalTimeToString = `${minutes}-${secondsCount < 10 ? '0' : ''}${remainingSeconds}`;
  return {
    minutes,
    totalSeconds: seconds,
    seconds: secondsCount,
    remainingSeconds,
    totalTime,
    totalTimeToString,
  }
}

export { getTime }