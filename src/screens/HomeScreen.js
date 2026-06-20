import { useState,  useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button';
import { colors, spacing, radius, fontSize } from '../styles/theme';
import { getMonthlySales, deleteSale } from '../services/salesService';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { converterNumberToMonth } from '../utils/utils';

export default function HomeScreen() {
    const [salesList, setSales] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    async function load() {
        try {
            setLoading(true);
            setError(null); 
            const sales = await getMonthlySales();
            setSales(sales);
        } catch (err) {
            setError('Não foi possível carregar a lista de vendas. Tente novamente mais tarde.');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

useFocusEffect(
    useCallback(() => {
        load(); 
    }, [])
);
    function createSaleScreen() {
        console.log('Botão pressionado!');
        navigation.navigate('NewSale');
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await deleteSale(id);
            console.log(response);
            
            setSales((prevSales) => prevSales.filter(sale => sale._id !== id));
            
            
            Alert.alert('Sucesso', 'Venda excluída com sucesso!');
        } catch (err) {
            console.log(err);
            Alert.alert('Erro', 'Não foi possível excluir a venda.');
        } finally {
            setLoading(false);
        }
    }; 

    async function handleUpdate(item) {
        console.log('Botão pressionado!');
        navigation.navigate('NewSale', { sale: item });
    }

    function saleItem({ item }) {
        return (
            <View style={styles.item}>
                <View style={styles.certificateTextContainer}>
                    <Text style={styles.saleTextContainer}>Mês: {converterNumberToMonth(item.month)}</Text>
                    <Text style={styles.saleTextContainer}>Valor: R$ {item.value}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Button text={'Excluir'} onPress={() => handleDelete(item._id)} />
                        <Button text={'Editar'} onPress={() => handleUpdate(item)} />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                <Text style={styles.title}>Vendas{'\n'}</Text> 
                {isLoading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size='large' color={colors.textPrimary} />
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <Button text="Tentar novamente" onPress={load} />
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={salesList}
                            keyExtractor={sale => sale._id}
                            renderItem={saleItem}
                            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Não há vendas cadastradas.</Text>}
                        />
                        <Button text={'Adicionar venda'} size='md' onPress={createSaleScreen} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize.xl,
    alignSelf: 'center',
    top: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  listContainer: {
      flex: 1,
      padding: 5,
  },
  centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  errorText: {
      color: colors.error,
      backgroundColor: colors.background,
      fontSize: fontSize.sm,
      textAlign: 'center',
      marginBottom: spacing.xl,
  },
  button: {
      backgroundColor: colors.accent,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      marginTop: spacing.xs,
  },
  saleTextContainer: {
      paddingTop: 3,
      paddingLeft: 15,
      color: colors.textPrimary,
  },
  item: {
      top: 5,
      flex: 1,
      borderWidth: 5,
      borderRadius: radius.sm,
      borderColor: colors.border,
      backgroundColor: colors.card,
      marginTop:10,
  },
  certificateText: {
      color: colors.textSecondary,
      fontSize: fontSize.sm,
      paddingTop: 2,
  },
  dataTittle: {
      fontWeight: 'bold',
  }
});
