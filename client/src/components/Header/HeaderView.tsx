import { Text } from '@welcome-ui/text';
import { Box } from '@welcome-ui/box';

export type HeaderProps = {
  timeRemaining: string;
};

export const HeaderView: React.FC<HeaderProps> = ({ timeRemaining }) => {
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
};
