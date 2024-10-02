// audit.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private logger = new Logger('Audit Interceptor');
  constructor() {
    //empty
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const requestUser: User | undefined = request.user;
    if (requestUser) {
      if (request.method === 'POST') {
        if (Array.isArray(request.body.bulk)) {
          request.body.bulk.forEach((item) => {
            if (typeof item === 'object' && item) {
              item.createdById = requestUser.id;
              item.updatedById = requestUser.id;
            }
          });
        } else {
          request.body.createdById = requestUser.id;
          request.body.updatedById = requestUser.id;
        }
      } else if (request.method === 'PATCH') {
        request.body.updatedById = requestUser.id;
      } else if (request.method === 'DELETE') {
        request.body.deletedById = requestUser.id;
      }
    }
    return next.handle();
  }
}
