export class EnumUtil {
  static convert<SourceEnum extends string, DestinationEnum extends string>(
    sourceEnum: { [key: string]: SourceEnum },
    destEnum: { [key: string]: DestinationEnum },
    value: SourceEnum,
  ): DestinationEnum {
    if (Object.values(destEnum).includes(value as unknown as DestinationEnum)) {
      return value as unknown as DestinationEnum;
    }

    throw new Error(`Can not convert value ${value} from enum ${sourceEnum} to enum ${destEnum}`);
  }
}
