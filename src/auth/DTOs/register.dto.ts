import { ApiProperty } from '@nestjs/swagger'

export class registerUserDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
    
    @ApiProperty()
    avatar: string;

    @ApiProperty()
    nick: string;

    @ApiProperty()
    areaOfExpertise: string[] = [];

    @ApiProperty()
    profession: string[] = [];

    @ApiProperty()
    use: string[] = [];
}