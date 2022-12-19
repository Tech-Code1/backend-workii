import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateWikiiDto {

    @ApiProperty()
    @MaxLength(150, { message: "El campo excede el número de caracteres permitidos"})
    @IsString({message: `El correo debe ser un string`})
    name: string;

    @ApiProperty({enum: 
        ['Arte', 
        'Informatica' , 
        'humanidades', 
        'Ciencias', 
        'Ingenieria',
        'Entretenimiento', 
        'Comunicación',
        'Marketing',
        'Otro']})
    @IsArray()
    target: string[] = [
      "Arte",
      "Informatica",
      "humanidades",
      "Ciencias",
      "Ingenieria",
      "Entretenimiento",
      "Comunicaciones",
      "Marketing",
      "Otro"
    ]

    @ApiProperty()
    @MaxLength(300, { message: "El campo excede el número de caracteres permitidos"})
    @IsString()
    description: string;

    @ApiProperty()
    @MaxLength(150, { message: "El campo excede el número de caracteres permitidos"})
    @IsArray()
    toDoList: string[];

    @ApiProperty()
    @Min(1, { message: "El minimo costo de un Workii no puede ser inferior a 1 dolar"})
    @Max(1000000, { message: "El campo excede el costo de lo que puede costar un Workii"})
    @IsNumber()
    cost: number;

    @ApiProperty({enum: [
        {id: 1, status: "Busqueda"}, 
        {id: 2, status: "Eligiendo"},
        {id: 3, status: "Iniciada"},
        {id: 4, status: "Finalizada"},
    ]})
    @IsArray()
    status: string[];

    @ApiProperty()
    @Min(3, { message: "El tiempo minimo para cumplir la tarea es de 3 días"})
    @Max(15, { message: "El tiempo minimo para cumplir la tarea es de 15 días"})
    @IsNumber()
    executionTime: number;
}
