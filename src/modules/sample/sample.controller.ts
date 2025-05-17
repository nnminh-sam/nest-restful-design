import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  HttpCode,
  Res,
} from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiSuccessResponse } from 'src/common/decorators/swagger/swagger-api-success-response.decorator';
import { Sample } from 'src/models/sample.model';
import { ResponseDto } from 'src/common/dtos/response.dto';

@ApiTags('Sample')
@Controller('samples')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @SwaggerApiSuccessResponse({
    description: 'Sample create API',
    dataType: Sample,
    key: 'sample',
    sampleMessage: 'This is a sample POST API',
    statusCode: 201,
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
  @Get()
  findAll() {
    return this.sampleService.findAll();
  }

  @SwaggerApiSuccessResponse({
    description: 'Sample find one API',
    dataType: Sample,
    key: 'sample',
    sampleMessage: 'This is a sample GET API',
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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    const response = this.sampleService.update(+id, updateSampleDto);
    return new ResponseDto(response);
  }

  @SwaggerApiSuccessResponse({
    description: 'Sample find all API',
    sampleMessage: 'This is a sample DELETE API',
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
