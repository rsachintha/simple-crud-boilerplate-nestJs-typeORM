import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(2, { message: 'Title must have atleast 2 characters.' })
  @IsNotEmpty()
  title: string;
  
  @IsString()
  @MinLength(2, { message: 'Content must have atleast 2 characters.' })
  @IsNotEmpty()
  content: string;
}

export default CreatePostDto;