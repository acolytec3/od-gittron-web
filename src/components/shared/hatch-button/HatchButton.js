import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { put } from '../../../util/requests';

class HatchButton extends Component {
  state = {
    contract: null,
    ownerOf: false,
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this._isMounted = true;

    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
    this.web3Service = this.props.gtContext.web3Service;

    if (this._isMounted) {
      const ownerOfToken = await this.ownerOf(this.props.bot.tokenId);
      this.setState({ ownerOfToken });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  ownerOf = async (tokenId) => {
    return await this.gittronWeb3Service.ownerOf(tokenId);
  };

  handleSubmit = async () => {
    this.setState({ isLoading: true });

    const res = await put(`bots/hatch/${this.props.bot.tokenId}`);

    if (res.data.hash) {
      this.setState({ isLoading: false });
      this.props.handleHatch();
    } else {
      this.setState({ isLoading: false, error: res });
    }
  };

  render() {
    const { ownerOfToken, isLoading, error } = this.state;
    const { account } = this.props;

    if (error) {
      return <p>There was an error while hatching your bot. Bummer.</p>;
    }

    if (isLoading) {
      return <p>Your bot is hatching</p>;
    }

    return (
      <Fragment>
        {ownerOfToken === account && !isLoading ? (
          <div className="HatchButton">
            <button onClick={this.handleSubmit}>Hatch Your Bot</button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withRouter(HatchButton);
