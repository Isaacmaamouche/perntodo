import { RefreshIcon } from '@welcome-ui/icons';
import { Text } from '@welcome-ui/text';
import { Button } from '@welcome-ui/button';
import { Flex } from '@welcome-ui/flex';
import { AddTodoContainer } from '../AddTodo/AddTodoContainer';

export type InputTodoProps = {
  loadDemoData: () => void;
};

export const InputTodoView: React.FC<InputTodoProps> = ({ loadDemoData }) => {
  return (
    <Flex direction="row" align="right" justify="end" gap="1rem" mt="md">
      <AddTodoContainer />
      <Button onClick={loadDemoData}>
        <Text variant="body2" as="span">
          Reset data
        </Text>
        <RefreshIcon />
      </Button>
    </Flex>
  );
};
