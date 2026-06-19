import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  Alert 
} from 'react-native';
import { requestPost } from '../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function NewSaleScreen() {
  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');
  const [visibleModal, setModalVisivel] = useState(false);

  const handleSave = async () => {
    if (!value || !month) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

  try{
	  const monthNumber = MONTHS.indexOf(month) + 1;
	  const newSale = {
		  month: monthNumber,
		  value: parseFloat(value.replace(',', '.')),
	  };
	  const response = await requestPost('sales', newSale);

	  console.log('Venda Cadastrada:', response);
	  Alert.alert('Sucesso', `Venda de R$ ${value} em ${month} cadastrada!`);
	  } catch (error) {
		  console.error("====== ERRO DETALHADO ======");
		  console.error("Mensagem:", error.message);
		  console.error("Objeto do erro:", JSON.stringify(error, null, 2));
		  console.error("============================");
		  Alert.alert('Erro de Conexão', error.message);}
    
    // Limpar campos
    setValue('');
    setMonth('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Cadastrar Venda</Text>

        {/* Campo de Valor */}
        <Text style={styles.label}>Valor da Venda (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1500,50"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        {/* Campo de Mês */}
        <Text style={styles.label}>Mês da Venda</Text>
        <TouchableOpacity 
          style={styles.selectButton} 
          onPress={() => setModalVisivel(true)}
        >
          <Text style={month ? styles.selectButtonText : styles.placeholderText}>
            {month || 'Selecione o mês'}
          </Text>
        </TouchableOpacity>

        {/* Botão de Enviar */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Venda</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para Seleção de Mês */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Mês</Text>
            
            <FlatList
              data={MONTHS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setMonth(item);
                    setModalVisivel(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 30,
    justifyContent: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    marginBottom: 25,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
