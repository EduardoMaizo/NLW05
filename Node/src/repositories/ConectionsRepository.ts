import { Connection } from '../entities/Connection';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Connection)
export class ConnectionsRepository extends Repository<Connection> {}