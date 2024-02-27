const storageLabel = 'datePicker';

export const setDatePickerValue = (value: string) => {
	return sessionStorage.setItem(storageLabel, value);
};

export const getDatePickerValue = () => {
	return sessionStorage.getItem(storageLabel);
};

export const removeDatePickerValue = () => {
	return sessionStorage.removeItem(storageLabel);
};
