import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiSuccessResponse } from 'src/common/decorators/swagger/swagger-api-success-response.decorator';
import { Sample } from 'src/models/sample.model';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { FilterSampleDto } from 'src/modules/sample/dto/filter-sample.dto';
import { SwaggerApiErrorResponse } from 'src/common/decorators/swagger/swagger-api-error-response.decorator';

@ApiTags('Sample')
@Controller('samples')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @SwaggerApiSuccessResponse({
    description: 'Sample create resource API',
    dataType: Sample,
    key: 'sample',
    statusCode: 201,
  })
  @SwaggerApiErrorResponse({
    statusCode: 400,
    description: 'Request produces validation error',
  })
  @SwaggerApiErrorResponse({
    statusCode: 401,
    description: 'User sent an unauthorized requeset',
  })
  @SwaggerApiErrorResponse({
    statusCode: 403,
    description: 'User is forbidden from sending this request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 500,
    description: 'Cannot create new resource',
  })
  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {
    const response = this.sampleService.create(createSampleDto);
    const builder = ResponseDto.builder<Sample>()
      .data(response)
      .statusCode(201)
      .message('Sample is created successfully');
    return builder.build();
  }

  @SwaggerApiSuccessResponse({
    description: 'Sample find all API',
    isArray: true,
    dataType: Sample,
    key: 'samples',
    sampleMessage: 'This is a sample GET API',
  })
  @SwaggerApiErrorResponse({
    statusCode: 400,
    description: 'Invalid filter parameters',
  })
  @SwaggerApiErrorResponse({
    statusCode: 401,
    description: 'User sent an unauthorized request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 403,
    description: 'User is forbidden from sending this request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 500,
    description: 'Cannot fetch samples',
  })
  @Get()
  findAll(@Query() filter: FilterSampleDto) {
    return this.sampleService.findAll(filter);
  }

  @SwaggerApiSuccessResponse({
    description: 'Sample find one API',
    dataType: Sample,
    key: 'sample',
    sampleMessage: 'This is a sample GET API',
  })
  @SwaggerApiErrorResponse({
    statusCode: 400,
    description: 'Invalid sample ID',
  })
  @SwaggerApiErrorResponse({
    statusCode: 401,
    description: 'User sent an unauthorized request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 403,
    description: 'User is forbidden from sending this request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 404,
    description: 'Sample not found',
  })
  @SwaggerApiErrorResponse({
    statusCode: 500,
    description: 'Cannot fetch sample',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const response = this.sampleService.findOne(+id);
    return new ResponseDto(response);
  }

  @SwaggerApiSuccessResponse({
    description: 'Sample find all API',
    dataType: Sample,
    key: 'sample',
    sampleMessage: 'This is a sample PATCH API',
  })
  @SwaggerApiErrorResponse({
    statusCode: 400,
    description: 'Invalid update data or sample ID',
  })
  @SwaggerApiErrorResponse({
    statusCode: 401,
    description: 'User sent an unauthorized request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 403,
    description: 'User is forbidden from sending this request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 404,
    description: 'Sample not found',
  })
  @SwaggerApiErrorResponse({
    statusCode: 500,
    description: 'Cannot update sample',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    const response = this.sampleService.update(+id, updateSampleDto);
    return new ResponseDto(response);
  }

  @SwaggerApiSuccessResponse({
    description: 'Sample find all API',
    sampleMessage: 'This is a sample DELETE API',
  })
  @SwaggerApiErrorResponse({
    statusCode: 400,
    description: 'Invalid sample ID',
  })
  @SwaggerApiErrorResponse({
    statusCode: 401,
    description: 'User sent an unauthorized request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 403,
    description: 'User is forbidden from sending this request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 404,
    description: 'Sample not found',
  })
  @SwaggerApiErrorResponse({
    statusCode: 500,
    description: 'Cannot delete sample',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const isDeleted = this.sampleService.remove(+id);
    if (!isDeleted) {
      throw new InternalServerErrorException('Cannot delete sample');
    }
    return 'Sample deleted successfully';
  }
}
