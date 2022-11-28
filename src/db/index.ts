import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const mysqlOption: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'asen',
    password: 'as123123',
    database: 'blog',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    autoLoadEntities: true,
};

export default mysqlOption;