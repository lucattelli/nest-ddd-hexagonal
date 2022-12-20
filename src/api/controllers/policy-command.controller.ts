import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateUpcomingPolicyCommand,
  CreateUpcomingPolicyCommandHandler,
  CreateUpcomingPolicyCommandResponse,
} from 'src/application/commands/create-upcoming-policy-command';
import { CommandResponse } from 'src/application/commands/util';

@Controller('policies/commands')
export class PolicyCommandController {
  private readonly createUpcomingPolicyCommandHandler: CreateUpcomingPolicyCommandHandler;

  public constructor(
    createUpcomingPolicyCommandHandler: CreateUpcomingPolicyCommandHandler,
  ) {
    this.createUpcomingPolicyCommandHandler =
      createUpcomingPolicyCommandHandler;
  }

  @Post('create-upcoming')
  async createUpcomming(
    @Body() command: CreateUpcomingPolicyCommand,
  ): Promise<CommandResponse<CreateUpcomingPolicyCommandResponse>> {
    return this.createUpcomingPolicyCommandHandler.execute(command);
  }
}
