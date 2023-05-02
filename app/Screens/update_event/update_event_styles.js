/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import Background from '../../Components/Background';
import { theme } from '../../core/style/theme';

const styles = StyleSheet.create({
    btn: {
        backgroundColor: theme.colors.primary,
        width: "50%",
        height: 50,
        padding: 5,
        margin: 10,
        borderRadius: 10,
        alignSelf: 'center',
        // borderWidth: 3,
        justifyContent: 'center',
    },
})
export default styles;