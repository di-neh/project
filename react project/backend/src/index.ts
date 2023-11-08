import app from "./App"
import { port } from "./config"
import { AppDataSource } from "./db/data-source"
import { Role } from "./entities/Role";
import { User } from "./entities/User";

AppDataSource.initialize().then(async () => {

    const roleRepository = AppDataSource.getRepository(Role);
    let count = await roleRepository.count();
    if(count === 0){
        let role = new Role("ADMIN", 0);
        await roleRepository.save(role);
        role = new Role("USER", 1);
        await roleRepository.save(role);
    }

    const userRepo = AppDataSource.getRepository(User);
    count = await userRepo.count();

    app.listen(port, ()=> {console.log('serv workin on - ' + port)})
}).catch(error => console.log(error))
