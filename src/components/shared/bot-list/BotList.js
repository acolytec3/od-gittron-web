import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import BotCard from '../bot-card/BotCard';

import './BotList.scss';
import { Web3Consumer } from 'web3-react';
import SupportButton from '../support-button/supportButton';

class BotList extends Component {
  renderBots() {
    return this.props.bots.map((bot) => {
      return (
        <Web3Consumer>
          {(context) => (
            <Fragment>
              <Link to={`bots/${bot.tokenId}`} key={bot.tokenId}>
                <BotCard bot={bot} />
              </Link>
              {bot.tokenType === 'prime' && (
                <SupportButton bot={bot} account={context.account} />
              )}
            </Fragment>
          )}
        </Web3Consumer>
      );
    });
  }

  render() {
    const botCards = this.renderBots();

    return (
      <div>
        <div />
        <div className="BotList">{botCards}</div>
      </div>
    );
  }
}

export default BotList;
