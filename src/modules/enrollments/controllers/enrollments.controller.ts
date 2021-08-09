import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CreateEnrollmentDto } from '../dto/enrollments/create-enrollment.dto';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentsService } from '../services/enrollments.service';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { ApiBasicAuth } from '@nestjs/swagger';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  @ApiBasicAuth()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  findAll(@Query() paginateRequestDto: PaginateRequestDto) {
    return this.enrollmentsService.findAll(paginateRequestDto);
  }
}
