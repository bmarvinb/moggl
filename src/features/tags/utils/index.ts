import { TagDto } from '../api/tag-dtos';
import { Tag } from '../types';

export function toTag(dto: TagDto): Tag {
  return {
    id: dto.id,
    name: dto.name,
    archived: dto.archived,
  };
}
