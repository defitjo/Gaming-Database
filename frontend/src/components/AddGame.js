import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getDevelopersQuery, addGameMutation, getGamesQuery } from '../query/query';

class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      date: '',
      developerId: '',
    };
  }
  showDevelopers() {
    let data = this.props.getDevelopersQuery;
    if (data.loading) {
      return (<option disabled>Developers Loading...</option>);
    } else {
      return data.developers.map(developer => {
        return (<option key={developer.id} value={developer.id}>{developer.name}</option>);
      });
    }
  }
  formSubmit(e) {
    e.preventDefault();
    this.props.addGameMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        date: this.state.date,
        developerId: this.state.developerId,
      },
      refetchQueries: [{ query: getGamesQuery }],
    });
  }
  render() {
    return (
      <form id="add-game" onSubmit={this.formSubmit.bind(this)}>
        <h3 className="form-title">Add Game to Library</h3>
        <div className="form-body">
          <label>Name of Game:</label>
          <input type="text" onChange={(e) => this.setState({name: e.target.value})} required />
        </div>
        <div className="form-body">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({genre: e.target.value})} required />
        </div>
        <div className="form-body">
          <label>Release Date:</label>
          <input type="date" onChange={(e) => this.setState({date: e.target.value})} required />
        </div>
        <div className="form-body">
          <label>Developer:</label>
          <select onChange={(e) => this.setState({developerId: e.target.value})}>
            <option>Choose a Developer</option>
            {this.showDevelopers()}
          </select>
        </div>
        <button>Add</button>
      </form>
    );
  }
}

export default compose(
  graphql(getDevelopersQuery, { name: 'getDevelopersQuery' }),
  graphql(addGameMutation, { name: 'addGameMutation' }),
)(AddGame);
