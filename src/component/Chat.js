
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Backend from '../Backend';


class Chat extends Component {
    state = {
        messages: []
    };
   componentWillMount() {
     this.setState({
           messages: [
             {
               _id: 1,
               text: 'Hello developer',
               createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
               user: {
                 _id: 2,
                 name: 'React Native',
                 avatar: 'https://facebook.github.io/react/img/logo_og.png',
               },
             },
           ],
         });
   }

    componentDidMount() {
      Backend.loadMessages((message) => {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
      });
    }


  componentWillUnmount() {
    Backend.closeChat();
  }

  renderBubble(props) {
    if (props.isSameUser(props.currentMessage, props.previousMessage)
     && props.isSameDay(props.currentMessage, props.previousMessage)) {
      return (
        <Bubble
          {...props}
        />
      );
    }
    return (
      <View>
        <Text style={styles.name}>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
        />
      </View>
    );
  }

  render() {
      return (
          <GiftedChat
          messages={this.state.messages}
          onSend={(message) => {
            Backend.sendMessage(message);
          }}
          user={{
            _id: Backend.getUid(),
            name: this.props.names,
          }}
          renderBubble={this.renderBubble}
          />

      );
  }
}

Chat.defaultProps = {
  name: 'xunhuanli'
};
const styles = StyleSheet.create({
    name: {
        color: 'grey',
    },
});

export default Chat;
