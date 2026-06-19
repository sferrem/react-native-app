import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ text, myOnPress }) {
  return (
      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.7} 
        onPress={myOnPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
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
    backgroundColor: '#007AFF', // Azul padrão (estilo iOS, pode mudar para o azul que preferir)
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,            // Bordas levemente arredondadas
    elevation: 3,               // Sombra suave no Android
    shadowColor: '#000',        // Sombra suave no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',           // Texto em branco
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
