import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class TransactionDto {
  @IsInt()
  @ApiProperty()
  id?: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  expired: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  confirmed: boolean;

  @IsString()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  reviverEmail?: string;

  @ApiProperty()
  createdAt?: Date;

  @IsInt()
  @ApiProperty()
  point: number;

  @IsOptional()
  @ApiProperty({ type: () => UserDto })
  sender?: UserDto;
}
