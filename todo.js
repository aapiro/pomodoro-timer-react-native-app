import React from "react";
import {View, Text, Button, ScrollView, Switch, TextInput, Alert,TouchableOpacity,StyleSheet,Image} from "react-native";
// import {Constants} from 'expo'

let id = 0;
const Todo = props => (
    <View style={{ flexDirection: 'row', alignItems: 'center', flex:1, justifyContent:'space-between' }}>
        <Switch value={props.todo.checked} onValueChange={props.onPressed} />
        <Text>{props.todo.text}</Text>
        <Button onPress={props.onDelete} title="delete" />
    </View>
);

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [] ,
            text : ''
        };
    }
    addTodo() {
        if(this.state.text == ''){
            Alert.alert('Please add your task!');
            return
        }
        this.textInput.clear()
        this.setState({
            todos: [...this.state.todos, { id: id++, text: this.state.text, checked: false }]
        });
        this.setState({ text:'' })
    }
    deleteTodo(id) {
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
    }
    toggleTodo(id) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id !== id) return todo;
                return {
                    id: todo.id,
                    text: todo.text,
                    checked: !todo.checked
                };
            })
        });
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <Text>Total Todos: {this.state.todos.length} </Text>
                <Text>
                    Unchecked Todos:{this.state.todos.filter(todo => todo.checked === false).length}
                </Text>
           
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 2,width:350}}
                    placeholder=" Put your task here..."
                    ref={input => { this.textInput = input }}
                    onChangeText={(text) => this.setState({text})}
                />

                <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.addTodo()} >
          {/*We can use any component which is used to shows something inside TouchableOpacity.
        It shows the item inside in horizontal orientation */}
          <Image
            //We are showing the Image from online
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/facebook.png')}

            //Image Style
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> add your task </Text>
        </TouchableOpacity>

                <ScrollView style={{ flex:1 }}>
                    {this.state.todos.map(todo => (
                        <Todo
                            todo={todo}
                            onDelete={() => this.deleteTodo(todo.id)}
                            onPressed={() => this.toggleTodo(todo.id)}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    
    FacebookStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#485a96',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      width: 220,
      borderRadius: 5,
      margin: 5,
    },
  
    ImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
  
    TextStyle: {
      color: '#fff',
      justifyContent: 'center',
      marginHorizontal: 30
    },
  
    SeparatorLine: {
      backgroundColor: '#fff',
      width: 1,
      height: 40,
    },
  });