import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import extended from 'dayjs/plugin/advancedFormat';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

dayjs.extend(extended);

export default function MainScreen() {

    const currentDate = dayjs();
    const [month, setMonth] = useState(currentDate);
    const [categories, setCategories] = useState([]);

    const handleNextMonth = () => {
        setMonth(month.add(1, 'month'));
    }
    const handlePreviousMonth = () => {
        setMonth(month.subtract(1, 'month'));
    }

  return (
    <div style={styles.container}>
        <div style={styles.monthSelection}>
      <FontAwesome name="arrow-circle-left" size={50} color="black" onMagicTap={handlePreviousMonth} />
      <h1>{month.format('MMMM - YY')}</h1>
      <FontAwesome name="arrow-circle-right" size={50} color="black" onMagicTap={handleNextMonth}/>
      </div>
        <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({item}) => <div><Text>{item}</Text></div>}
        />
    </div>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    monthSelection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    });