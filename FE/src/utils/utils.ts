import axios from 'axios';

export const fetchDataWithUrl = (url: string) => async () => await axios(url);
export const autoCompleteFilter = (inputValue: string, option: any) =>
  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
