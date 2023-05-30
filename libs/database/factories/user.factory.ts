import { hashSync } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../src';
import { EProfession, EValidRoles, Etarget } from '../src/lib/interfaces/interfaces.entities';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.id = faker.helpers.fake(uuidv4());
  user.email = faker.internet.email();
  user.password = hashSync(faker.internet.password(), 10);
  user.avatar = faker.internet.avatar();
  user.nick = faker.name.firstName();
  user.areaOfExpertise = faker.helpers.fake(Etarget.SCIENCES);
  user.profession = faker.helpers.fake(EProfession.PROFESSOR);
  user.isActive = faker.datatype.boolean();
  user.roles = faker.helpers.arrayElements([EValidRoles.USER]);
  user.timeOfCreation = faker.datatype.number(new Date().getTime());

  return user;
});