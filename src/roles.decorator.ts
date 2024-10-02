import { SetMetadata } from '@nestjs/common';
import { AgentRole } from './utils/roles/AgentEnum';

export const Roles = (...roles: AgentRole[]) => SetMetadata('roles', roles);
