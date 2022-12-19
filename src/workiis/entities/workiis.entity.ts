import { NotFoundException } from "@nestjs/common";
import { throwError } from "rxjs";

export class Workii {
    id: string;
    name: string;
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
    description: string;
    toDoList: string[];
    cost: number;
    status: string[];
    applications?: number;
    executionTime: number;
    timeOfCreation: number;
    timeOfFinished?: number;
}

