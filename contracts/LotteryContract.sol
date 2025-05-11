// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LotteryContract {
    struct Lottery {
        uint256 id;
        string title;
        uint256 ticketPrice;
        uint256 maxTickets;
        address[] participants;
        bool isActive;
    }

    mapping(uint256 => Lottery) public lotteries;
    uint256 public nextLotteryId;

    event TicketPurchased(uint256 lotteryId, address buyer);
    event LotteryEnded(uint256 lotteryId, address winner);

    function createLottery(string memory _title, uint256 _ticketPrice, uint256 _maxTickets) public {
        Lottery storage newLottery = lotteries[nextLotteryId];
        newLottery.id = nextLotteryId;
        newLottery.title = _title;
        newLottery.ticketPrice = _ticketPrice;
        newLottery.maxTickets = _maxTickets;
        newLottery.isActive = true;
        nextLotteryId++;
    }

    function buyTicket(uint256 _lotteryId) public payable {
        Lottery storage lottery = lotteries[_lotteryId];
        require(lottery.isActive, "Lottery is not active");
        require(msg.value == lottery.ticketPrice, "Incorrect ticket price");
        require(lottery.participants.length < lottery.maxTickets, "All tickets sold");
        lottery.participants.push(msg.sender);
        emit TicketPurchased(_lotteryId, msg.sender);
    }

    function endLottery(uint256 _lotteryId) public {
        Lottery storage lottery = lotteries[_lotteryId];
        require(lottery.isActive, "Lottery already ended");
        lottery.isActive = false;

        if (lottery.participants.length > 0) {
            uint256 winnerIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % lottery.participants.length;
            address winner = lottery.participants[winnerIndex];
            payable(winner).transfer(address(this).balance);
            emit LotteryEnded(_lotteryId, winner);
        }
    }

    function getParticipants(uint256 _lotteryId) public view returns (address[] memory) {
        return lotteries[_lotteryId].participants;
    }
}