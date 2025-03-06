import React, { createContext, Component } from 'react';
import { checkAuthentication } from '../services/AuthService';
import {withNavigation} from '../withNavigation';
export const AuthContext = createContext();
class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: { authenticated: false, role: null, uid: null, email: null },
    };
  }

  componentDidMount() {
    const fetchAuthState = async () => {
      const result = await checkAuthentication();
      console.log("authState", result);
      this.setState({ authState: result });
      if (result.authenticated) {
        this.props.navigate('/home');
      }
    };

    fetchAuthState();
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.authState}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default withNavigation(AuthProvider);
