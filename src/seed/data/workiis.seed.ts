import { IUser } from "src/users/interfaces/user.interface";
import { Workii } from "src/workiis/entities/workiis.entity";
import { v4 as uuidv4 } from 'uuid';

export const WORKIIS_SEED: Workii[] = [
    {
        id: uuidv4(),
        name: "Hacer un programa que sume",
        target: ["Informatica"],
        description: "El programa debe sumar entre 2 números",
        toDoList: [
        'El programa debe estar libre de bugs', 
        'El programa debe sumar correctamente', 
        'El programa debe de ser intuitivo'
        ],
        cost: 20,
        status: 'iniciado',
        applications: 3,
        executionTime: 12,
        timeOfCreation: 12,
        timeOfFinished: 12
    },
    {
        id: uuidv4(),
        name: "Hacer una ilustración",
        target: ["Arte"],
        description: "Ilustración para portada",
        toDoList: [
        'La ilustración debe expresar lo que el titulo de la portada quiere decir', 
        'La ilustración debe hacerse en digital', 
        'En la ilustración debe aparecer 2 personajes'
        ],
        cost: 20,
        status: 'Busqueda',
        applications: 3,
        executionTime: 12,
        timeOfCreation: 12,
        timeOfFinished: 12
    },
]