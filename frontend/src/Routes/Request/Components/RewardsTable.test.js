import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RewardsTable from './RewardsTable';

let noRewards = [];
let twoRewards = [{
    "rewarderId": "5f8f2b9f33f9b3002f3a3624",
    "rewarderName": "Ron",
    "rewardItem": "Bubble Tea"
}, {
    "rewarderId": "5f8f2fed33f9b3002f3a3629",
    "rewarderName": "Jason",
    "rewardItem": "Dinner"
}]

const fakeHandleDeleteFunction = jest.fn((num) => {});
const fakeHandleAddRewardFunction = jest.fn((word) => {});

it('renders rewards table title as "Rewards"', () => {
    const {queryByTestId} = render(
        <RewardsTable
            requestStatus="Open"
            rewards={[]}
            handleDeleteReward={fakeHandleDeleteFunction}
            handleAddReward={fakeHandleAddRewardFunction}
        />
    );
    // const rewardTableHeading = screen.getAllByTestId('rewards-table-heading');
    expect(queryByTestId('rewards-table-heading')).toBeTruthy();
    // expect(rewardTableHeading[0]).toContain(/Rewards/i);
});

it('renders each reward in a row', () => {
    const {queryAllByTestId} = render(
        <RewardsTable
            requestStatus="Open"
            rewards={twoRewards}
            handleDeleteReward={fakeHandleDeleteFunction}
            handleAddReward={fakeHandleAddRewardFunction}
        />
    );
    const rewardRows = queryAllByTestId('reward-row');
    expect(rewardRows).toBeTruthy();
    expect(rewardRows.length).toBe(2);
});

it('renders note instead of reward rows when there\'s 0 rewards', () => {
    const {queryByText, queryByTestId} = render(
        <RewardsTable
            requestStatus="Open"
            rewards={noRewards}
            handleDeleteReward={fakeHandleDeleteFunction}
            handleAddReward={fakeHandleAddRewardFunction}
        />
    );
    const rewardRows = queryByTestId('reward-row');
    expect(rewardRows).toBeFalsy();
    
    const noRewardsText = queryByText('There are no rewards yet. Select and Add a Reward below.');
    expect(noRewardsText).toBeTruthy();
})
