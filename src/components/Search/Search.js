import { React, Component } from 'react';
import { Input } from 'antd';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: this.props.searchQuery,
      changeHandler: this.props.changeHandler
    }
  }

  render() {
    const {searchQuery, changeHandler} = this.state;
    return(
      <Input value={searchQuery} placeholder="Type to..." 
      onChange={(e) => {
        this.setState({
          searchQuery: e.target.value
        })
      changeHandler(e.target.value)
      }} />
    )
  }
}

export default Search;