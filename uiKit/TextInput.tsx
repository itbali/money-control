import { KeyboardTypeOptions, TextInput as NativeTextInput, StyleSheet } from 'react-native';

export const TextInput = ({ value, onChange, placeholder, keyboardType }: TextInputProps) => {
	return (
		<NativeTextInput
			style={styles.input}
			placeholder={placeholder}
			value={value}
			onChangeText={onChange}
			keyboardType={keyboardType}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		width: '100%',
		fontSize: 20,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		borderRadius: 10,
		padding: 15,
	},
});

type TextInputProps = {
	keyboardType?: KeyboardTypeOptions;
	placeholder: string;
	value: string;
	onChange: (text: string) => void;
};

export default TextInput;
