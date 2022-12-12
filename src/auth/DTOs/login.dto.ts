import { ApiProperty } from '@nestjs/swagger'

export class loginUserDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}