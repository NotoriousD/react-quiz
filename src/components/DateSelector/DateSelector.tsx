import React, { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DateSelector: React.FC<any> = (props) => {
  const [date, setDate] = useState<Dayjs | null>(props.value ? dayjs(props.value) : null)
  const handleChange = (value: Dayjs) => {
    const date = dayjs(value);
    setDate(date)
    props.onChange(date.format('DD-MM-YYYY'));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        value={date}
        size="small"
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
}
