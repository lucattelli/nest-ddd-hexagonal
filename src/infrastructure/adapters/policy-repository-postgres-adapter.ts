import { PolicyRepositoryPort } from 'src/application/ports';
import { Policy } from 'src/domain/entities/policy';

export class PolicyRepositoryPostgressAdapter implements PolicyRepositoryPort {
  get(uuid: string): Promise<Policy> {
    throw new Error(`Method not implemented. Cannot get policy UUID ${uuid}`);
  }
  put(policy: Policy): Promise<void> {
    throw new Error(
      `Method not implemented. Cannot put policy UUID ${policy.uuid}`,
    );
  }
}
