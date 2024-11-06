import React, { Component } from "react";

export default class EmojiVoting extends Component {
  state = {
    votes: JSON.parse(localStorage.getItem("votes")) || {},
    topEmoji: 0,
    topVotes: "",
    emojis: ["😊", "😂", "😍", "🤔"],
  };

  handleResult = () => {
    console.log(this.state.votes);
    const { votes } = this.state;
    let maxVotes = 0;
    let topEmoji = "";

    for (let emoji in votes) {
      if (votes[emoji] > maxVotes) {
        maxVotes = votes[emoji];
        topEmoji = emoji;
      }
    }

    this.setState({
      topEmoji: topEmoji || "No votes yet!",
      topVotes: maxVotes,
    });
  };
  handleVote = (event) => {
    const updatedVotes = { ...this.state.votes };
    const emoji = event.target.getAttribute("data-emoji");
    updatedVotes[emoji] = (updatedVotes[emoji] || 0) + 1;
    this.setState({ votes: updatedVotes }, () => {
      localStorage.setItem("votes", JSON.stringify(this.state.votes));
    });
    console.log(event.target.getAttribute("data-emoji"), updatedVotes);
  };
  handleClean = (event) => {
    localStorage.setItem("votes", JSON.stringify(this.state.votes));
    const { votes } = this.state;

    console.log(votes);
    this.setState({
      votes: {},
      topEmoji: "",
      topVotes: 0,
    });
  };
  render() {
    const { topEmoji, topVotes, emojis } = this.state;
    return (
      <div>
        <h1>Vote for Your Favorite Emoji!</h1>

        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center gap-3 ">
          {emojis.map((emoji, key) => (
            <div
              key={key}
              className="d-flex flex-row "
              style={{ fontSize: "3em" }}
              onClick={this.handleVote}
              data-emoji={emoji}
            >
              {emoji}
              <p>{this.state.votes[emoji] || 0}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={this.handleResult}>
          Show Results
        </button>
        <p
          className="d-flex flex-row justify-content-center "
          style={{ fontSize: "3em" }}
        >
          {topEmoji && `${topEmoji}  ${topVotes} `}
        </p>
        <button className="btn btn-primary" onClick={this.handleClean}>
          Clean Button
        </button>
      </div>
    );
  }
}
