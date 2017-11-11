
import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Backend from '../Backend';


class Chat extends Component {
    state = {
        messages: []
    };
   componentWillMount() {
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
  render() {
      return (
          <GiftedChat
          name={this.props.name}
          messages={this.state.messages}
          onSend={(message) => {
            Backend.sendMessage(message);
          }}
          user={{
            _id: Backend.getUid(),
            name: this.props.name,
          }}
          />
      );
  }
}

Chat.defaultProps = {
  name: 'xunhuanli'
};


export default Chat;
