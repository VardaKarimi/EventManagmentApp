import React from 'react';
import {StyleSheet} from 'react-native';

import { theme } from '../core/style/theme';
import { Button as PaperButton } from 'react-native-paper';

export default function Button({mode, style, ...props}) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: theme.colors.surface},
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    width:"40%",
    padding: 5,
    margin: 5,
    borderWidth: 1, justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    Color:'#ffffff'
  },
});