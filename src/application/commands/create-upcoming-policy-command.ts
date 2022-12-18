import { Policy, PolicyStatus, PolicyType } from 'src/domain/entities/policy';
import {
  BaseCommand,
  BaseCommandHandler,
  CommandResponse,
  CommandStatus,
} from './util';
import { v4 as generateUuidV4 } from 'uuid';
import { PolicyRepositoryPort } from '../ports';

export enum PolicyCommandPolicyType {
  COMMERCIAL_PACKAGE = 'COMMERCIAL_PACKAGE',
  GENERAL_LIABILITY = 'GENERAL_LIABILITY',
}

export interface CreateUpcomingPolicyCommandBody {
  type: PolicyCommandPolicyType;
  premium: number;
}

export interface CreateUpcomingPolicyCommandResponse {
  policyUuid: string;
}

export class CreateUpcomingPolicyCommand extends BaseCommand<CreateUpcomingPolicyCommandBody> {}

export class CreateUpcomingPolicyCommandHandler
  implements
    BaseCommandHandler<
      CreateUpcomingPolicyCommand,
      CreateUpcomingPolicyCommandResponse
    >
{
  private readonly policyRepository: PolicyRepositoryPort;

  public constructor(policyRepository: PolicyRepositoryPort) {
    this.policyRepository = policyRepository;
  }

  public async execute(
    command: CreateUpcomingPolicyCommand,
  ): Promise<CommandResponse<CreateUpcomingPolicyCommandResponse>> {
    const { uuid: commandUuid } = command.header;
    try {
      const response = await this.executeCommand(command);
      return response;
    } catch (e) {
      console.error({ e });
      return {
        uuid: commandUuid,
        status: CommandStatus.ERROR,
        body: {
          errorCode: 'failed',
          errorDetails: e,
          errorMessage: 'Failed to create upcoming policy',
        },
      };
    }
  }

  private async executeCommand(
    command: CreateUpcomingPolicyCommand,
  ): Promise<CommandResponse<CreateUpcomingPolicyCommandResponse>> {
    const policy = new Policy(
      generateUuidV4(),
      this.toPolicyType(command.body.type),
      PolicyStatus.UPCOMING,
      command.body.premium,
    );

    await this.policyRepository.put(policy);

    return {
      uuid: command.header.uuid,
      status: CommandStatus.SUCCESS,
      body: { policyUuid: policy.uuid },
    };
  }

  private toPolicyType(type: PolicyCommandPolicyType): PolicyType {
    if (type === PolicyCommandPolicyType.COMMERCIAL_PACKAGE)
      return PolicyType.COMMERCIAL_PACKAGE;

    if (type === PolicyCommandPolicyType.GENERAL_LIABILITY)
      return PolicyType.GENERAL_LIABILITY;

    throw new Error(`Invalid PolicyCommandPolicyType: ${type}`);
  }
}
