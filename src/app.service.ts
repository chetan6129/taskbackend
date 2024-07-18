import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMain(): any {
    return {
        "name": "task-api",
        "version": "0.0.1",
        "description": "backend of taskmanager",
        "author": "SidharthaPaidi"
    }
  }
}
 