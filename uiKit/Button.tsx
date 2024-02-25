import { DimensionValue, Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export const Button = ({ children, width = '100%', height, onTap }: ButtonProps) => {
	return (
		<Pressable
			style={{ ...styles.button, width, height }}
			onPress={onTap}
		>
			<Text>{children}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		gap: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
});

type ButtonProps = {
	children: React.ReactNode;
	width?: DimensionValue | undefined;
	height?: DimensionValue | undefined;
	onTap: () => void;
};
export default Button;
