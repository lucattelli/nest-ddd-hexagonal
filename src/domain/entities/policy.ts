export enum PolicyType {
  COMMERCIAL_PACKAGE = 'COMMERCIAL_PACKAGE',
  GENERAL_LIABILITY = 'GENERAL_LIABILITY',
}

export enum PolicyStatus {
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

export class Policy {
  public readonly uuid: string;
  public readonly type: PolicyType;
  public readonly status: PolicyStatus;
  public readonly premium: number;

  public constructor(
    uuid: string,
    type: PolicyType,
    status: PolicyStatus,
    premium: number,
  ) {
    this.uuid = uuid;
    this.type = type;
    this.status = status;
    this.premium = premium;
  }
}
