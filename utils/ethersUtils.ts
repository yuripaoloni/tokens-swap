import { utils, BigNumberish, constants, BigNumber } from "ethers";

export const AddressZero = constants.AddressZero;

export const formatBigNumber = (
  bigNumber: BigNumberish,
  decimals: BigNumberish
): string => {
  return utils.formatUnits(bigNumber, decimals);
};

export const getBigNumber = (
  value: string,
  decimals: BigNumberish
): BigNumber => {
  return utils.parseUnits(value, decimals);
};
