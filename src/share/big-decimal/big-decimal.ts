import BigNumber from 'bignumber.js';

export class BigDecimal {
  static readonly ZERO = new BigDecimal(0);
  static readonly ONE = new BigDecimal(1);

  private readonly value: BigNumber;

  private constructor(value: BigNumber.Value) {
    this.value = new BigNumber(value);
  }

  static valueOf(value: BigNumber.Value | BigDecimal): BigDecimal {
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof BigDecimal) {
      return value;
    }
    try {
      const bn = new BigNumber(value);
      if (!bn.isFinite()) {
        return null;
      }
      return new BigDecimal(bn);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null;
    }
  }

  add(other: BigDecimal): BigDecimal {
    return new BigDecimal(this.value.plus(other.value));
  }

  subtract(other: BigDecimal): BigDecimal {
    return new BigDecimal(this.value.minus(other.value));
  }

  multiply(other: BigDecimal): BigDecimal {
    return new BigDecimal(this.value.multipliedBy(other.value));
  }

  divide(other: BigDecimal, decimalPlaces = 10): BigDecimal {
    return new BigDecimal(this.value.dividedBy(other.value).decimalPlaces(decimalPlaces));
  }

  round(
    decimalPlaces = 0,
    roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_UP,
  ): BigDecimal {
    return new BigDecimal(this.value.decimalPlaces(decimalPlaces, roundingMode));
  }

  toFixed(decimalPlaces = 2): string {
    return this.value.toFixed(decimalPlaces);
  }

  compareTo(other: BigDecimal): number {
    return this.value.comparedTo(other.value);
  }

  equals(other: BigDecimal): boolean {
    return this.compareTo(other) === 0;
  }

  negate(): BigDecimal {
    return new BigDecimal(this.value.negated());
  }

  toNumber(): number {
    return this.value.toNumber();
  }

  toString(): string {
    return this.value.toString();
  }
}
