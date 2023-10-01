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

   
    if(count === 0){
        let userRoles:Role[] = [{id: 1, name: "USER"}];
        let user = new User("penis", "penis@detrov.com", "xdd", userRoles);
        await userRepo.save(user);

        userRoles = [{id: 0, name: "ADMIN"}, {id: 1, name: "USER"}];
        user = new User("oleg", "mayami@tequila.com", "xdd", userRoles);
        await userRepo.save(user);

        userRoles = [{id: 0, name: "ADMIN"}];
        user = new User("Capy", "cup@ibary.com", "xdd", userRoles);
        await userRepo.save(user);
    }

    app.listen(port, ()=> {console.log('serv workin on - ' + port)})
}).catch(error => console.log(error))
