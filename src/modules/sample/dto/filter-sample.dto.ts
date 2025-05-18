import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { BaseFilterDto } from 'src/common/dtos/base-filter.dto';
import { Sample } from 'src/models/sample.model';

export class FilterSampleDto extends IntersectionType(
  PartialType(PickType(Sample, ['str', 'num'])),
  BaseFilterDto,
) {}
