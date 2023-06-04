import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import { ErrorMessage } from 'components/ErrorMessage';

import css from './radioInput.module.scss';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioInputProps {
  name: string;
  inputName?: string;
  title?: string;
  value: any;
  options: RadioOption[];
  withOther?: string[];
  fieldValue?: string;
  error?: Record<string, any>;
  inputType?: string;
  fieldOptions?: RadioOption[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextField?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  name,
  title,
  value,
  options,
  withOther = undefined,
  inputName,
  fieldValue,
  error,
  inputType = 'text',
  fieldOptions,
  onChange,
  onChangeTextField,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  const renderFields = (option: RadioOption) => {
    switch (inputType) {
      case 'radio':
        return (
          <div className={css.radioWrapper}>
            {error?.value && (
              <ErrorMessage message={String(error?.value.message)} />
            )}
            <RadioGroup
              aria-labelledby={`${inputName}-"radio-buttons-group"`}
              name={inputName}
              value={fieldValue}
              onChange={onChangeTextField}
            >
              {fieldOptions &&
                fieldOptions.map((fieldOption) => (
                  <FormControlLabel
                    key={fieldOption.value}
                    value={fieldOption.value}
                    control={<Radio />}
                    label={fieldOption.label}
                    disabled={!withOther?.includes(value)}
                  />
                ))}
            </RadioGroup>
          </div>
        );
      default:
        const isHasError = error?.value && option.value === value;
        return (
          <div className={css.inputWrapper}>
            <TextField
              label={option.label}
              size="small"
              type={inputType}
              name={inputName}
              defaultValue={fieldValue}
              onChange={onChangeTextField}
              disabled={value !== option.value}
            />
            {isHasError && (
              <ErrorMessage message={String(error?.value.message)} />
            )}
          </div>
        );
    }
  };
  return (
    <FormControl>
      {title && (
        <FormLabel id={`${name}-"radio-buttons-group"`} className={css.label}>
          {title}
        </FormLabel>
      )}
      {error?.key && <ErrorMessage message={String(error?.key.message)} />}
      <RadioGroup
        aria-labelledby={`${name}-"radio-buttons-group"`}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => {
          const isHasTextField = withOther && withOther.includes(option.value);
          return (
            <>
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
              {isHasTextField && renderFields(option)}
            </>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
