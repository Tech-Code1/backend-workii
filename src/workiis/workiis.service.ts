import { Injectable, NotFoundException } from '@nestjs/common';
import { Workii } from '../workiis/entities/workiis.entity';
import { CreateWikiiDto } from '../workiis/dto/create-workiis.dto';
import { UpdateWikiiDto } from '../workiis/dto/update-workiis.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WorkiisService {

  today = new Date();
  sevenDaysFromToday = new Date();

  private workiis: Workii[] = [
    {
    id: uuidv4(),
    name: "Crear un diseño",
    target: [],
    description: "Crear un logo bonito",
    toDoList: [
      "El logo debe representar los colores de la empresa",
      "El logo debe ser redondo"

    ],
    cost: 100,
    status: ["Iniciada"],
    executionTime: 3,
    timeOfCreation: new Date().getTime()
  }
]
  

  create(createWikiiDto: CreateWikiiDto) {

    let {name, target, description, toDoList, cost, status, executionTime} = createWikiiDto

    executionTime = this.timelImit(executionTime)

    const workii: Workii = {
      id: uuidv4(),
      name: name.toLocaleLowerCase(),
      target: target,
      description: description,
      toDoList: toDoList,
      cost: cost,
      status: status,
      executionTime: executionTime,
      timeOfCreation: new Date().getTime()
    }
  }

timelImit(days: number): number {

    let dataInitial: Date = new Date()

    if (typeof days === 'number' && days > 0) {

        if(days === 3 || days === 5 || days === 7 || days === 10 || days === 15) {

            return dataInitial.setDate(dataInitial.getDate() + days)

        }
            
        return days = 3
    } 

    throw new NotFoundException("Los días ingresados son invalidos");
}

  findAll() {
    return this.workiis;
  }

  findOne(id: string) {
    const workii = this.workiis.find((workii) => workii.id === id)
    if(!workii) throw new NotFoundException(`Workii with id "${id}" not found`)
   
  }

  update(id: string, updateWikiiDto: UpdateWikiiDto) {
    //const {cost, description, executionTime, name, target, toDoList} = updateWikiiDto

    /* let workiiDB = this.findOne(id);

    this.workiis = this.workiis.map( workii => {
      if(workii.id === id) {
        workiiDB = {...workiiDB, ...updateWikiiDto}
        return workiiDB
      }
      return workiiDB
    }) */
  }

  remove(id: string) {
    this.workiis = this.workiis.filter(workii => workii.id !== id)
  }
}
