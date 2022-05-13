import { useEmojiPicker, EmojiPicker } from '@welcome-ui/emoji-picker';
import { Emoji } from '@welcome-ui/emoji';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@welcome-ui/date-picker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { Field } from '@welcome-ui/field';
import { Box } from '@welcome-ui/box';
import { Button } from '@welcome-ui/button';
import { Todo } from '../ListTodo/ListTodosContainer';
import { formatToFullDate } from '../../utils/DateUtils';
import {
  AddIcon,
  CheckIcon,
  CrossIcon,
  DateIcon,
  ResetIcon,
} from '@welcome-ui/icons';
import { InputText } from '@welcome-ui/input-text';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { Toggle } from '@welcome-ui/toggle';
import { Textarea } from '@welcome-ui/textarea';

registerLocale('fr', fr);

export type FormDataType = {
  completed: boolean;
  title: string | number;
  description?: string;
  date?: Date;
  tag?: string[] | string;
};

export type TodoFormProps = {
  submitHandler: (formData: FormDataType) => void;
  todo?: Todo;
  submitButtonText: string;
  toggleModal: () => void;
  setTodoToCompleted?: (arr: number, arr2: boolean) => void;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  submitHandler,
  todo,
  toggleModal,
  submitButtonText,
  setTodoToCompleted,
}) => {
  const [dateValue, setDateValue] = useState(
    todo ? new Date(todo.date) : new Date()
  );
  const handleDateChange = (newValue: any) => {
    // const formattedValue = formatToFullDate(newValue);
    setDateValue(newValue);
  };

  const [completed, setCompleted] = useState(todo?.completed);
  const handleStatusToggle = () => {
    setCompleted(!completed);
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      completed: completed,
      title: todo?.title,
      description: todo?.description,
      date: dateValue,
      tag: todo?.tag.join(', '),
    },
  });

  // console.log(watch('completed'));

  //   const emojiPicker = useEmojiPicker();
  //   const [emoji, setEmoji] = useState(':page_facing_up');
  //    const HandleEmojiOnChange = (value: string) => {
  //     setEmoji(value);
  //   };

  function handleSetTodoToCompleted(todo_id: number, newStatus: boolean) {
    if (setTodoToCompleted) setTodoToCompleted(todo_id, newStatus);
    toggleModal();
  }

  return (
    <>
      <Box position="absolute" top="1rem" right="1rem">
        <Button shape="circle" variant="tertiary" onClick={toggleModal}>
          <CrossIcon size="lg" />
        </Button>
      </Box>
      <form
        onSubmit={handleSubmit((formData) => {
          console.log(formData);
          submitHandler(formData);
        })}
      >
        <Flex direction="column" gap="1.5rem">
          <Field
            label="Statut"
            // hidden={submitButtonText == 'Edit' ? false : true}
            hidden
          >
            <Toggle
              {...register('completed')}
              name="status"
              checked={completed}
              onClick={handleStatusToggle}
            />
          </Field>
          <Field label="Tâche" required error={errors.title?.message}>
            <InputText
              className={errors.title && 'formElementRequired'}
              {...register('title', {
                required: 'Ce champs est requis',
                minLength: 1,
              })}
              name="title"
              placeholder="Nom de la tâche"
              isClearable
            />
          </Field>
          <Field label="Description">
            <Textarea
              {...register('description')}
              name="description"
              placeholder="Description"
              // onChange={handleDescription}
              // value={value}
            />
          </Field>

          {/* <Field label="Emoji">
          <input
            {...register('AddTodoEmoji')}
            id="AddTodoEmoji"
            type="text"
            placeholder="Emoji"
          />
        </Field>
        <EmojiPicker.Trigger as={Button} {...emojiPicker}>
          {emoji ? <Emoji emoji={emoji} /> : 'Open Emoji Picker'}
        </EmojiPicker.Trigger>

        <EmojiPicker
          onChange={HandleEmojiOnChange}
          value={emoji}
          {...emojiPicker}
        /> */}

          <Field label="Date">
            <DatePicker
              {...register('date')}
              icon={<DateIcon color="light.100" />}
              locale={fr}
              name="date"
              onChange={handleDateChange}
              value={dateValue}
            />
          </Field>

          {/* <Field label="Date">
          <input
            {...register('date')}
            type="date"
            value={todo && formatToFullDate(todo.date)}
          />
        </Field> */}
          <Field label="Tag" hint="Séparez les tags par une virgule">
            <InputText
              {...register('tag')}
              name="tag"
              placeholder="Todo Tag"
              isClearable
            />
          </Field>
          <Flex direction="column" align="right" justify="end" gap="1rem">
            <Button type="submit" variant="primary-info">
              <Text variant="body2" as="span">
                {submitButtonText}
              </Text>
              <AddIcon />
            </Button>
            {todo && setTodoToCompleted && (
              <>
                {todo.completed === false ? (
                  <Button
                    variant="primary-success"
                    onClick={() =>
                      handleSetTodoToCompleted(todo.todo_id, !todo.completed)
                    }
                  >
                    <Text variant="body2" as="span">
                      Marquer comme complétée
                    </Text>
                    <CheckIcon size="lg" />
                  </Button>
                ) : (
                  <Button
                    variant="primary-warning"
                    onClick={() =>
                      handleSetTodoToCompleted(todo.todo_id, !todo.completed)
                    }
                  >
                    <Text variant="body2" as="span">
                      Marquer comme en cours
                    </Text>
                    <ResetIcon size="lg" />
                  </Button>
                )}
              </>
            )}
            <Button variant="primary-danger" onClick={toggleModal}>
              <Text variant="body2" as="span">
                Annuler
              </Text>
              <CrossIcon />
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};
