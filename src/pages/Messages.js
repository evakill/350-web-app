import React from 'react'
import { Redirect } from 'react-router';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Messages extends React.Component {
  render() {
    if (cookies.get('schoolID') == null) {
      return (
          <Redirect to='/' />
        );
    };

    return (
      <p> MESSAGES </p>
    );
  }
}

export default Messages;
