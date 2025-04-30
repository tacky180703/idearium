import { View, Text, StyleSheet } from 'react-native';

type LogCardProps = {
  message: string;
  date: Date;
};

export default function LogCard({ message, date }: LogCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.date}>{date.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  message: {
    fontSize: 14,
  },
  date: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
  },
});
