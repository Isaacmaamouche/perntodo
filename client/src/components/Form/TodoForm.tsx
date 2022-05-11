import { useEmojiPicker, EmojiPicker } from '@welcome-ui/emoji-picker';
import { Emoji } from '@welcome-ui/emoji';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@welcome-ui/date-picker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { Field } from '@welcome-ui/field';
import { Button } from '@welcome-ui/button';
import { Todo } from '../ListTodo/ListTodosContainer';
import { formatToFullDate } from '../../utils/DateUtils';
import { AddIcon, CrossIcon, DateIcon } from '@welcome-ui/icons';
import { InputText } from '@welcome-ui/input-text';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { Toggle } from '@welcome-ui/toggle';

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
};

export const AddTodoForm: React.FC<TodoFormProps> = ({
  submitHandler,
  todo,
  toggleModal,
  submitButtonText,
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

  console.log(watch('completed'));

  //   const emojiPicker = useEmojiPicker();
  //   const [emoji, setEmoji] = useState(':page_facing_up');
  //    const HandleEmojiOnChange = (value: string) => {
  //     setEmoji(value);
  //   };

  return (
    <>
      <form
        onSubmit={handleSubmit((formData) => {
          console.log(formData);
          submitHandler(formData);
        })}
      >
        <Flex direction="column" gap="1.5rem">
          <Field
            label="Status"
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
          <Field label="Todo Title" required error={errors.title?.message}>
            <InputText
              className={errors.title && 'formElementRequired'}
              {...register('title', {
                required: 'Ce champs est requis',
                minLength: 1,
              })}
              name="title"
              placeholder="Title"
              isClearable
            />
          </Field>

          <Field label="Todo Description">
            <InputText
              {...register('description')}
              name="description"
              placeholder="Todo description"
              isClearable
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
              name="welcome"
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
          <Flex direction="row" align="right" justify="end" gap="1rem">
            <Button type="submit" variant="primary-info">
              <Text variant="body2" as="span">
                {submitButtonText}
              </Text>
              <AddIcon />
            </Button>
            <Button variant="primary-warning" onClick={toggleModal}>
              <Text variant="body2" as="span">
                Cancel
              </Text>
              <CrossIcon />
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};
