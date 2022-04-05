# Tokens-swap

<div align="center">
  <img src="https://user-images.githubusercontent.com/50517749/161720381-07fc3a62-e614-4db5-b13e-6ce5b84c46c6.png" data-canonical-src="https://user-images.githubusercontent.com/50517749/161720381-07fc3a62-e614-4db5-b13e-6ce5b84c46c6.png" width="700" />
  <img src="https://user-images.githubusercontent.com/50517749/161720389-5fabd360-b3f4-43d2-995c-bf188fb755b9.png" data-canonical-src="https://user-images.githubusercontent.com/50517749/161720389-5fabd360-b3f4-43d2-995c-bf188fb755b9.png" width="700" />
</div>

---

Tokens-swap is React web application which allows the swap of [BEP-20](https://github.com/bnb-chain/BEPs/blob/master/BEP20.md) tokens. It was built using [ethers.js](https://docs.ethers.io/v5/getting-started/) and [web3-react](https://github.com/NoahZinsmeister/web3-react) for the blockchain connection, and [TailwindCSS](https://tailwindcss.com/) for the styling.

The swap functionality has been implemented using a set of [PancakeSwap](https://pancakeswap.finance/)'s contracts:

- [FactoryV2](https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/factory-v2): to check if the selected tokens Pair is valid
- [RouterV2](https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/router-v2): to swap tokens and get the expected amount of tokenB as output with a certain amount of tokenA as input based on the Pair's reserves

The tradable tokens are pre-defined in a [list](/src/config/constants/pancakeSwapTokensList.json) consisting of the most traded tokens on PancakeSwap. The list has been taken from the [PancakeSwap Github repository](https://github.com/pancakeswap/pancake-frontend/tree/develop/src/config/constants/tokenLists).

## Author

- [yuripaoloni](https://github.com/yuripaoloni)
