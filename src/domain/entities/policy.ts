export enum PolicyType {
  GENERAL_LIABILITY = 'GENERAL_LIABILITY',
}

export enum PolicyStatus {
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  ARCHIVED = 'ARCHIVED',
}

export interface Policy {
  id: string;
  type: PolicyType;
  status: PolicyStatus;
}

export class UpcomingPolicy implements Policy {
  public readonly status: PolicyStatus = PolicyStatus.UPCOMING;

  constructor(public readonly id: string, public readonly type: PolicyType) {}

  public toActivePolicy(): ActivePolicy {
    return new ActivePolicy(this.id, this.type);
  }
}

export class ActivePolicy implements Policy {
  public readonly status: PolicyStatus = PolicyStatus.ACTIVE;

  constructor(public readonly id: string, public readonly type: PolicyType) {}
}

export class ExpiredPolicy implements Policy {
  public readonly status: PolicyStatus = PolicyStatus.EXPIRED;

  constructor(public readonly id: string, public readonly type: PolicyType) {}

  public static fromPolicy(policy: Policy): ExpiredPolicy {
    return new ExpiredPolicy(policy.id, policy.type);
  }
}

export class ArchivedPolicy implements Policy {
  public readonly status: PolicyStatus = PolicyStatus.ARCHIVED;

  constructor(public readonly id: string, public readonly type: PolicyType) {}

  public static fromPolicy(policy: Policy): ArchivedPolicy {
    return new ArchivedPolicy(policy.id, policy.type);
  }
}
