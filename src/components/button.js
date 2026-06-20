import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { buttonSizes } from '../styles/theme.js';
export default function Button({ text, onPress, size='md' }) {
	const selectedSize = buttonSizes[size] || buttonSizes.md;
  return (
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPress}
	style={styles.button}
      >
	  <Text style={[styles.baseText, { fontSize: selectedSize.fontSize }]}>
        {text}
      </Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007AFF', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
