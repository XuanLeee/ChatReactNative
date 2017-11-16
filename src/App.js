
import React from 'react';
import {
    Router,
    Scene,
} from 'react-native-router-flux';
import { Platform } from 'react-native';

import Name from './component/Name';
import Chat from './component/Chat';


class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key='root' style={{ paddingTop: Platform.OS === 'ios' ? 64 : 54 }}>
                    <Scene key='name' component={Name} title='Sign In' />
                    <Scene key='chat' component={Chat} title='Chat' />
                </Scene>
            </Router>
        );
    }
}


export default App;
