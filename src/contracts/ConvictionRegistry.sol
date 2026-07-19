// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ConvictionRegistry
/// @notice Immutable public record of conviction calls on crypto narratives.
///         The Conviction app computes a narrative's conviction score;
///         users commit their own call onchain so they can't rewrite history.
/// @dev Deployed on Monad Testnet at 0x5EB1f32Bd9d54256A08549F62E47d95F4249e3Eb
contract ConvictionRegistry {
    enum Direction {
        Bearish,
        Neutral,
        Bullish
    }

    struct ConvictionCall {
        address caller;
        string narrativeId;
        Direction direction;
        uint8 score;
        string thesis;
        uint256 timestamp;
    }

    ConvictionCall[] private calls;
    mapping(address => uint256[]) private callsByUser;

    event ConvictionRecorded(
        uint256 indexed id,
        address indexed caller,
        string narrativeId,
        Direction direction,
        uint8 score,
        uint256 timestamp
    );

    function recordConviction(
        string calldata narrativeId,
        Direction direction,
        uint8 score,
        string calldata thesis
    ) external returns (uint256 id) {
        require(score <= 100, "score > 100");
        require(bytes(narrativeId).length > 0, "empty narrative");
        require(bytes(thesis).length <= 280, "thesis too long");

        id = calls.length;
        calls.push(
            ConvictionCall({
                caller: msg.sender,
                narrativeId: narrativeId,
                direction: direction,
                score: score,
                thesis: thesis,
                timestamp: block.timestamp
            })
        );
        callsByUser[msg.sender].push(id);

        emit ConvictionRecorded(
            id,
            msg.sender,
            narrativeId,
            direction,
            score,
            block.timestamp
        );
    }

    function totalCalls() external view returns (uint256) {
        return calls.length;
    }

    function getCall(uint256 id)
        external
        view
        returns (ConvictionCall memory)
    {
        require(id < calls.length, "bad id");
        return calls[id];
    }

    function latestCalls(uint256 limit)
        external
        view
        returns (ConvictionCall[] memory out)
    {
        uint256 n = calls.length;
        uint256 count = limit < n ? limit : n;
        out = new ConvictionCall[](count);
        for (uint256 i = 0; i < count; i++) {
            out[i] = calls[n - 1 - i];
        }
    }

    function userCallIds(address user)
        external
        view
        returns (uint256[] memory)
    {
        return callsByUser[user];
    }
}