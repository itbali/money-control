import { FontAwesome } from '@expo/vector-icons';
import { Pressable, View, StyleSheet } from 'react-native';

export const TrashIcon = ({ onTap }: TrashIconProps) => {
	return (
		<Pressable onPress={onTap}>
			<View style={styles.categoryDelete}>
				<FontAwesome
					name="trash"
					size={30}
					color="white"
				/>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	categoryDelete: {
		backgroundColor: 'red',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
});

type TrashIconProps = {
	onTap: () => void;
};
