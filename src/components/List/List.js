/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './List.css';
import withStyles from '../../decorators/withStyles';
import ArticleItem from '../ArticleItem';

@withStyles(styles)
class List extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props){
        super(props);
        
        console.log("list:constructor");

    }
    
  render() {
    console.log("list:render");
    let list_name = this.props.name;
    let list_content = this.props.items;
    return (
      <div className={list_name}>
        <div className="container">
                {list_content.map((item,index) => {
                    return <ArticleItem className="list-container"  index={index+1} article={item} />
                })}
        </div>
      </div>
    );
  }

}

export default List;
