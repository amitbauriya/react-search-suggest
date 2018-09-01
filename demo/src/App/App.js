import styles from './App.less';
import React, { Component } from 'react';
import Render from 'Render/Render';

export default class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>React Search Suggest Example</h1>
        <div className={styles.subHeader}>
          Enter any of string it will highlight, built in with React
        </div>
        <div className={styles.renderSearch}>
          <Render />
        </div>
      </div>
    );
  }
}
