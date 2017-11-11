
import firebase from 'firebase';


class Backend {
  uid = '';
  messageRef = null;

  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB5bHd4SiMZcuBHUWdIJ7BD1azxdPIi1ZI',
      authDomain: 'chat-51eeb.firebaseapp.com',
      databaseURL: 'https://chat-51eeb.firebaseio.com',
      projectId: 'chat-51eeb',
      storageBucket: '',
      messagingSenderId: '513202594804'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('message');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
