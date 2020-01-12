import React, { useState } from 'react';
import { Item, Input, Label } from 'native-base';

function FloatingInput (props){
  const [ value, setValue ] = useState()

  return (
    <Item floatingLabel style={props.style}>
      <Label style={{paddingTop:20}}>{props.label}</Label>
      <Input 
        onChangeText={text => setValue(text)}
        value={value}/>
    </Item>
  );
}

export default FloatingInput;