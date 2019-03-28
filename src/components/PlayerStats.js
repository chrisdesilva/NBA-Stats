import React, { Component } from 'react';

class PlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTeam: undefined,
      homeScore: undefined,
      awayTeam: undefined,
      awayScore: undefined,
      gameStatus: undefined,
      teams: ["Teams"],
      teamID: null,
      error: undefined
    }
  }


  componentDidMount() {
    fetch("https://www.balldontlie.io/api/v1/teams")
    .then(res => res.json())
    .then( result => {
      console.log(result)
      this.setState({
        teams: result.data
      })
    })
    .catch(error => this.setState({ error: "Please try again" }))
  }

  // getStats = async (e) => {
  //   e.preventDefault();
  //   await fetch("https://www.balldontlie.io/api/v1/teams")
  //   .then(res => res.json())
  //   .then( result => {
  //     console.log(result)
  //     this.setState({
  //       homeTeam: result.data[0].home_team.full_name,
  //       homeScore: result.data[0].home_team_score,
  //       awayTeam: result.data[0].visitor_team.full_name,
  //       awayScore: result.data[0].visitor_team_score,
  //       gameStatus: result.data[0].status
  //     })
  //   })
  //   .catch(error => this.setState({ error: "Please try again" }))
  // }

    getScore = (e) => {
      this.setState({ teamID: e.target.value })
    }

    getGame = async (e) => {
      e.preventDefault();
      await fetch(`https://www.balldontlie.io/api/v1/games/?seasons[]=2018&&team_ids[]=${this.state.teamID}`)
      .then(res => res.json())
      .then( result => {
        console.log(result)
        this.setState({
          homeTeam: result.data[result.data.length - 1].home_team.full_name,
          homeScore: result.data[result.data.length - 1].home_team_score,
          awayTeam: result.data[result.data.length - 1].visitor_team.full_name,
          awayScore: result.data[result.data.length - 1].visitor_team_score,
          gameStatus: result.data[result.data.length - 1].status
        })
      })
      .catch(error => this.setState({ error: "Please select a team from the dropdown menu" }))
    }

  render() {
    return (
      <div>
        <div>
          {this.state.homeTeam && <p>{this.state.homeTeam} : {this.state.homeScore} - {this.state.awayTeam} : {this.state.awayScore}</p>}
        </div>
        <div>
          {this.state.gameStatus}
        </div>
        <div>
          <button onClick={this.getGame}>Get Stats</button>
          {this.state.error && <p>{this.state.error}</p>}
          <select onChange={this.getScore}>
            <option>Teams</option>
            {this.state.teams.map( team => { return <option key={team.id} value={team.id}>{team.abbreviation}</option> } )}
          </select>
        </div>
      </div>
    )
  }
}

export default PlayerStats