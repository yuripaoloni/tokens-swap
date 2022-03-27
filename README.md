# Token-swap

Token-swap is React web application which allows the swap of [BEP-20](https://github.com/bnb-chain/BEPs/blob/master/BEP20.md) tokens. It was built using [ethers.js](https://docs.ethers.io/v5/getting-started/) and [web3-react](https://github.com/NoahZinsmeister/web3-react) for the blockchain connection, and [TailwindCSS](https://tailwindcss.com/) for the styling.

The swap functionality has been implemented using a set of [PancakeSwap](https://pancakeswap.finance/)'s contracts:

- [FactoryV2](https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/factory-v2): to check if the selected tokens Pair is valid
- [RouterV2](https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/router-v2): to swap tokens and get the expected amount of tokenB as output with a certain amount of tokenA as input based on the Pair's reserves

The tradable tokens are pre-defined in list consisting of the most traded tokens on [PancakeSwap](https://pancakeswap.finance/). The list has been token from the [PancakeSwap Github repository](https://github.com/pancakeswap/pancake-frontend/tree/develop/src/config/constants/tokenLists).

## Author

- [yuripaoloni](https://github.com/yuripaoloni)
