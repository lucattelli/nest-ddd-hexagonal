import { Module } from '@nestjs/common';
import { CreateUpcomingPolicyCommandHandler } from 'src/application/commands/create-upcoming-policy-command';
import { PolicyRepositoryPostgressAdapter } from '../adapters/policy-repository-postgres-adapter';
import { PolicyCommandController } from './policy-command.controller';

@Module({
  imports: [],
  controllers: [PolicyCommandController],
  providers: [
    PolicyRepositoryPostgressAdapter,
    CreateUpcomingPolicyCommandHandler,
  ],
})
export class ControllersModule {}
