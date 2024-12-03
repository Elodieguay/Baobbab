import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Inject, Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import mikroOrmConfig from '../../mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from './orm.config';
import { ConfigType } from '@nestjs/config';

@Module({
    imports: [
        MikroOrmModule.forRoot({
            ...mikroOrmConfig,
        })
    ],
})
export class OrmModule implements OnApplicationBootstrap { 
    logger = new Logger('OrmModule');

    constructor(
        private readonly orm: MikroORM,
        @Inject(ormConfig.KEY) 
        private readonly _ormConfig: ConfigType<typeof ormConfig>
    ) {}

    async checkDatabase() {
        const isConnect = await this.orm.isConnected();

        const connectionFailed = () => {
            this.logger.error(
                `Connection to the database failed ${this.orm.config.getClientUrl(true)}`,
            )
        }

        const connectionSuccess = () => {
            this.logger.log(
                `Connected to the database ${this.orm.config.getClientUrl(true)}`,
            )
        }

        isConnect ? connectionSuccess() : connectionFailed();
    }

    async checkSync() {
        if (!this._ormConfig.sync) {
            return
        }

        this.logger.log('Update database schema...');
        await this.orm.getSchemaGenerator().updateSchema(undefined);
    }

    async onApplicationBootstrap() {
        await this.checkDatabase();
        await this.checkSync();
    }
    
    async flush() {
        await this.orm.em.flush();
    }
}
