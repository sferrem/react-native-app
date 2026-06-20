import { useState, useEffect } from 'react'; 
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
import { saveNewSale, updateSale } from '../services/salesService'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { MONTHS, converterNumberToMonth } from '../utils/utils';

export default function NewSaleScreen({ route, navigation }) {
  const saleToEdit = route.params?.sale || null;
  const isEditing = !!saleToEdit;

  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    if (isEditing && saleToEdit) {
      setValue(String(saleToEdit.value));
      setMonth(converterNumberToMonth(saleToEdit.month));
    }
  }, [saleToEdit]);

  const handleSave = async () => {
    if (!value || !month) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }


    const valueToSend = value;
    const monthToSend = month;

    try {
      if (isEditing) {
        const updatedFields = {
          month: monthToSend, 
          value: valueToSend
        };
        
        await updateSale(saleToEdit._id, updatedFields);
        Alert.alert('Sucesso', 'Venda atualizada com sucesso!');
      } else {
        
        await saveNewSale(monthToSend, valueToSend);
        Alert.alert('Sucesso', `Venda de R$ ${valueToSend} em ${monthToSend} cadastrada!`);
      }

      setValue('');
      setMonth('');
      
      navigation.goBack(); 
      
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível salvar.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>{isEditing ? 'Editar Venda' : 'Cadastrar Venda'}</Text>
        
        
        <Text style={styles.label}>Valor da Venda (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1500,50"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

       
        <Text style={styles.label}>Mês da Venda</Text>
        <TouchableOpacity 
          style={styles.selectButton} 
          onPress={() => setVisibleModal(true)}
        >
          <Text style={month ? styles.selectButtonText : styles.placeholderText}>
            {month || 'Selecione o mês'}
          </Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{isEditing ? 'Salvar Alterações' : 'Salvar Venda'}</Text>
        </TouchableOpacity>
      </View>

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: 450 }]}> 
            <Text style={styles.modalTitle}>Selecione o Mês</Text>
            
            <FlatList
              data={MONTHS}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setMonth(item);
                    setVisibleModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setVisibleModal(false)}
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
