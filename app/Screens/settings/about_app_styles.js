/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { theme } from '../../core/style/theme';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.secondary,
    },
    text: {
        fontSize: 22,
        marginTop: 10,
        color: theme.colors.primary

    }
})
export default styles;