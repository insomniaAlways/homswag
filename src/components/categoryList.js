import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import {
  Button,
  Icon,
  List,
  ListItem,
  Text
} from '@ui-kitten/components';

const CategoryList = (props) => {
  let flatListProps ={numColumns: 3, horizontal: false, style: styles.list}

  const RenderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate('Items', { category: item })}
      style={styles.itemContainer}
    >
      <Image
        style={{width: 30, height: 30}}
        source={{uri: item.image_source}}
      />
      <Text style={{width: '90%', textAlign: 'center', fontSize: 12}}>{item.display_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{padding: 10, paddingBottom: 0}}>What you like do?</Text>
      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
        {props.data.map((item, index) => <RenderItem key={index} item={item} index={index}/>)}
      </View>
    </View>
  )
  // return (
  //   <View>
  //     <List
  //       data={props.data}
  //       renderItem={RenderItem}
  //       {...flatListProps}
  //     />
  //   </View>
  // );
};

export default CategoryList;

const styles = StyleSheet.create({
  itemContainer: {
    width: '33.33%',
    height: 90,
    paddingTop: 10,
    paddingBottom: 10,
    // marginTop: 10,
    alignItems: "center",
    justifyContent: 'center',
    // backgroundColor: "#eee"
  },
  list: {
    backgroundColor: "white",
    padding: 10
  }
})