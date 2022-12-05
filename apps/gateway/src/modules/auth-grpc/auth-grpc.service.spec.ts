import { Test, TestingModule } from '@nestjs/testing';
import { AuthGrpcService } from './auth-grpc.service';

describe('AuthGrpcService', () => {
  let service: AuthGrpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGrpcService],
    }).compile();

    service = module.get<AuthGrpcService>(AuthGrpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
