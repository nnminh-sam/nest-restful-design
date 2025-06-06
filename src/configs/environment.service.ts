import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/configs/environment-variable';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  use(key: EnvKey) {
    return this.configService.get(key);
  }
}
