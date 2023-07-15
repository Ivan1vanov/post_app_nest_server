import { DeepPartial, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

export class BaseRepository<TEntity extends ObjectLiteral> {
  constructor(protected readonly baseRepository: Repository<TEntity>) {}

  getById = async <TRelations extends string>(
    entityId: string,
    relations: Array<TRelations> = [],
  ): Promise<TEntity | undefined> =>
    this.baseRepository.findOne({
      relations,
      where: {
        id: entityId,
      } as unknown as FindOptionsWhere<TEntity>,
    });

  getOneBy = async <TRelations extends string>(
    params: FindOptionsWhere<TEntity>,
    relations: Array<TRelations> = [],
  ): Promise<TEntity | undefined> =>
    this.baseRepository.findOne({
      relations,
      where: params,
    });

  saveEntity = async (data: DeepPartial<TEntity>): Promise<TEntity> => this.baseRepository.save(data);
}
