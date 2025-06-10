import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, FlatList } from 'react-native';

export default function App() {
  const [total, setTotal] = useState('');
  const [people, setPeople] = useState('');
  const [tip, setTip] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateShare = () => {
    const totalAmount = parseFloat(total);
    const numberOfPeople = parseInt(people);
    const tipPercentage = parseFloat(tip) || 0;

    if (isNaN(totalAmount) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
      setResult('Preencha os campos corretamente.');
      return;
    }

    const tipAmount = (totalAmount * tipPercentage) / 100;
    const finalAmount = totalAmount + tipAmount;
    const perPerson = finalAmount / numberOfPeople;

    const message = `Cada pessoa deve pagar R$ ${perPerson.toFixed(2)}`;
    setResult(message);

    // Atualiza histórico
    const newEntry = {
      id: Date.now().toString(),
      total: totalAmount.toFixed(2),
      people: numberOfPeople,
      tip: tipPercentage.toFixed(2),
      perPerson: perPerson.toFixed(2),
    };

    setHistory([newEntry, ...history]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DivApp</Text>

      <Text style={styles.label}>Valor total da conta (R$):</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={total}
        onChangeText={setTotal}
      />

      <Text style={styles.label}>Número de pessoas:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={people}
        onChangeText={setPeople}
      />

      <Text style={styles.label}>Gorjeta (% - opcional):</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={tip}
        onChangeText={setTip}
      />

      <View style={{ marginVertical: 10 }}>
        <Button title="Calcular" onPress={calculateShare} />
      </View>

      {result && <Text style={styles.result}>{result}</Text>}

      <Text style={[styles.title, { fontSize: 20, marginTop: 30 }]}>Histórico</Text>
      {history.length === 0 && <Text style={{ textAlign: 'center' }}>Nenhum cálculo ainda.</Text>}

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>Conta: R$ {item.total}</Text>
            <Text>Pessoas: {item.people}</Text>
            <Text>Gorjeta: {item.tip} %</Text>
            <Text style={{ fontWeight: 'bold' }}>Por pessoa: R$ {item.perPerson}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    color: '#4CAF50',
  },
  historyItem: {
    backgroundColor: '#FFF',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderColor: '#DDD',
    borderWidth: 1,
  },
});