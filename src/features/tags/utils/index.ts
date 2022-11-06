import { TagDTO } from '../dtos';
import { Tag } from '../types';

export function toTag(dto: TagDTO): Tag {
  return {
    id: dto.id,
    name: dto.name,
    archived: dto.archived,
  };
}
