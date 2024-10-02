import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AgentRole } from 'src/utils/roles/AgentEnum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const user = request.user;

      const roles = this.reflector.get<AgentRole[]>(
        'roles',
        context.getHandler(),
      );

      return roles.includes(user.role);
    }
    return false;
  }
}
