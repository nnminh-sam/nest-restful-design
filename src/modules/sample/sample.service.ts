import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { Sample } from 'src/models/sample.model';
import { PaginationDto } from 'src/common/dtos/pagination-response.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { FilterSampleDto } from 'src/modules/sample/dto/filter-sample.dto';

@Injectable()
export class SampleService {
  create(createSampleDto: CreateSampleDto) {
    const data: Sample = {
      str: 'Data 1',
      num: 1210,
      bool: true,
      arr: ['1', '2', '3'],
    };
    return data;
  }

  findAll(filter: FilterSampleDto) {
    const data: Sample[] = [
      {
        str: 'Data 1',
        num: 1210,
        bool: true,
        arr: ['1', '2', '3'],
      },
      {
        str: 'Data 2',
        num: 1210,
        bool: true,
        arr: ['1', '2', '3'],
      },
      {
        str: 'Data 3',
        num: 1210,
        bool: true,
        arr: ['1', '2', '3'],
      },
    ];

    const pagination: PaginationDto = {
      total: 3,
      page: 1,
      perPage: 5,
      totalPages: 1,
    };
    return new ResponseDto(data, pagination);
  }

  findOne(id: number) {
    const data: Sample = {
      str: 'Data 1',
      num: 1210,
      bool: true,
      arr: ['1', '2', '3'],
    };
    return data;
  }

  update(id: number, updateSampleDto: UpdateSampleDto) {
    const data: Sample = {
      str: 'Data 1',
      num: 1210,
      bool: true,
      arr: ['1', '2', '3'],
    };
    const updateData: UpdateSampleDto = {
      str: '10',
      num: 1210,
    };
    return data;
  }

  remove(id: number) {
    return true;
  }
}
