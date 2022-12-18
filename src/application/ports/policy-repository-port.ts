import { Policy } from 'src/domain/entities/policy';

export interface PolicyRepositoryPort {
  get(uuid: string): Promise<Policy>;
  put(policy: Policy): Promise<void>;
}
