import { ApiProperty } from '@nestjs/swagger'

export class registerUserDto {

    @ApiProperty()
    email: string;
}