import { Module } from '@nestjs/common';
import { CommonService } from './services/handleExceptions.service';
import { FileInterceptorService } from './services/uploadFiles.service';

@Module({
    providers: [CommonService, FileInterceptorService],
    exports: [CommonService, FileInterceptorService]
})
export class CommonModule {}
