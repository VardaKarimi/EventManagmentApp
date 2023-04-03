/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View, Text, ScrollView, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import Eventdata from '../../core/constants/EventString';
import TextInput from '../../Components/TextInput';

const Screen1 = ({ navigation }) => {
  const onPressShowDetails = (eventId) => {
    navigation.navigate('showDetails', { eventId });
  }
  //SearchBar
  const [search, setSearch] = useState()
  const [eventData, setEventData] = useState(Eventdata)
  const [filteredData, setFilteredData] = useState()

  const [shouldShow, setShoulShow] = useState(true)

  const searchFilterFunction = (text) => {

    if (text) {
      // Inserted text is not blank
      // Filter the eventData
      // Update Filtered
      const newData = eventData.filter(
        function (item) {
          const itemData = item.Title
            ? item.Title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredData(newData);
      setSearch(text);
    }
    else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredData(eventData);
      setSearch(text);
    }
  };
  //to Display item

  const ItemView = ({ item }) => {
    return (
      <Card key={item.id}>
        <Card.Content>
          <Title>{item.Title}</Title>
        </Card.Content>
        <Card.Cover source={{ uri: item.imageUrl }} />
        <Card.Content>
          <Paragraph>{item.Description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => onPressShowDetails(item.id)}>Show Details</Button>
        </Card.Actions>
      </Card>

      // <Text style={styles.ItemView} onPress={() => onPressShowDetails(item.id)}>{item.Title}</Text>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 37 }}>
      <ScrollView>

        <View>
          <TextInput onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Search Here" style={styles.searchBar} onFocus={() => setShoulShow(false)} />
          <FlatList
            data={filteredData}
            keyExtractor={(item, id) => id.toString()}
            ItemSeparatorComponent={""}
            renderItem={ItemView}
          />
        </View>

        {shouldShow && Eventdata.map(event => (
          <Card key={event.id}>
            <Card.Content>
              <Title>{event.Title}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: event.imageUrl }} />
            <Card.Content>
              <Paragraph>{event.Description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => onPressShowDetails(event.id)}>Show Details</Button>
            </Card.Actions>
          </Card>
        ))
        }

        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} >Go to Home</Button>
        <Button title="Go back" onPress={() => navigation.goBack()}>Go back</Button>
      </ScrollView>
    </View>



  );
}
export default Screen1;
const styles = StyleSheet.create({
  ItemView: {
    fontSize: 20,
    textAlign: 'center',
  },
  searchBar: {
    borderColor: "#00235B",
    borderWidth: 1,

  }
})