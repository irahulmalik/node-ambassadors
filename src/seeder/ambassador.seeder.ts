import { createConnection, getRepository} from "typeorm";
import { User } from "../entity/user_entity";
import bcryptjs from 'bcryptjs';
import * as faker from 'faker';

// to run this "docker-compose exec backend sh" this will open doecker bash
// then run "npm run seed:ambassadors
createConnection().then(async()=>{
    const repository = getRepository(User);

    const password = await bcryptjs.hash("1234",10);

    for(let i = 0; i<30; i++){
        await repository.save({
            first_name: faker.name.firstName(),
            lastName: faker.name.lastName(),
        
            email: faker.internet.email(),
            password,
            is_ambassdor:true,
            

        })
    }
    process.exit();
})