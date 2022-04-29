import { useState, useEffect } from 'react';
import { Text } from '@welcome-ui/text';
import { Box } from '@welcome-ui/box';

export default function HeaderContainer() {
  const CalcTimeRemaining = () => {
    const countdown = new Date().getTime();
    let until10 = 10 - (new Date().getMinutes() % 10) + new Date().getMinutes();
    if (until10 >= 60) until10 = 0;
    const target = new Date(`Jan 1, 2135 00:${until10}:00`).getTime();
    const timeUntil = target - countdown;
    const minutesRemaining = new Date(timeUntil).getMinutes();
    const secondsRemaining = String(new Date(timeUntil).getSeconds());
    const s =
      secondsRemaining.length === 1 ? '0' + secondsRemaining : secondsRemaining;
    return minutesRemaining + ':' + s;
  };

  const [timeRemaining, setTimeRemaining] = useState(CalcTimeRemaining());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(CalcTimeRemaining());
    }, 1000);
    if (CalcTimeRemaining() === '0:00') {
      window.location.href = '/';
    }
    return () => clearTimeout(timer);
  }, [timeRemaining]);
  return (
    <Box textAlign="center" mt="md">
      <Text variant="h1" mb="md">
        PERN Stack Todo list
      </Text>
      <Text variant="h2">Postgres, Express, React, and Node.js</Text>
      <Box
        backgroundColor="info.700"
        color="info.100"
        fontSize="md"
        py="lg"
        role="alert"
      >
        <Text variant="body2" as="span">
          The database is reset every 10 min with demo records.
          <br />
          {timeRemaining} before reset
        </Text>
      </Box>
    </Box>
  );
}
