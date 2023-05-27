/* import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { WorkiisService } from 'src/workiis/workiis.service';
import { USERS_SEED } from './data/users.seed';
import { WORKIIS_SEED } from './data/workiis.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly usersService: UsersService,
    private readonly workiisService: WorkiisService
  ) {}

  populateDB() {
    //USERS_SEED
    //WORKIIS_SEED

    this.usersService.fillUsersWithSeedData(USERS_SEED)
    this.workiisService.fillWorkiisWithSeedData(WORKIIS_SEED)
    return 'Seed executed successfully';
  }

}
 */
