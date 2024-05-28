import {IBookmarkForm} from '@/type';
import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {TextInput} from 'react-native';

interface IProps {
  control: Control<IBookmarkForm>;
  name: keyof IBookmarkForm;
  placeholder: string;
}

export default function HookFormInput({control, name, placeholder}: IProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
    />
  );
}
