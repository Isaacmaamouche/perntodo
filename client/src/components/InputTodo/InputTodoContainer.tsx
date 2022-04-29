import { useState } from 'react';
import { RefreshIcon } from '@welcome-ui/icons';
import { Text } from '@welcome-ui/text';
import { Button } from '@welcome-ui/button';
import { Flex } from '@welcome-ui/flex';
import AddTodoContainer from '../AddTodo/AddTodoContainer';
import { Box } from '@welcome-ui/box';

export default function InputTodo() {
  async function resetDemoData() {
    try {
      await fetch('/todos/reset');
    } catch (error) {
      console.error({ error });
    }
  }

  function loadDemoData() {
    resetDemoData();
    window.location.href = '/';
  }
  return (
    <>
      <Flex direction="row" align="right" justify="end" gap="1rem" mt="md">
        <AddTodoContainer />
        <Button onClick={loadDemoData}>
          <Text variant="body2" as="span">
            Reset data
          </Text>
          <RefreshIcon />
        </Button>
      </Flex>
    </>
  );
}
