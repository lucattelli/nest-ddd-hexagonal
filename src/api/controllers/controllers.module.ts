import { Module } from '@nestjs/common';
import { CreateUpcomingPolicyCommandHandler } from 'src/application/commands/create-upcoming-policy-command';
import { PolicyRepositoryPostgressAdapter } from 'src/infrastructure/adapters/policy-repository-postgres-adapter';
import { PolicyCommandController } from './policy-command.controller';

const appServiceProvider = {
  provide: 'PolicyRepositoryPort',
  useClass: PolicyRepositoryPostgressAdapter,
};

@Module({
  imports: [],
  controllers: [PolicyCommandController],
  providers: [CreateUpcomingPolicyCommandHandler, appServiceProvider],
})
export class ControllersModule {}
