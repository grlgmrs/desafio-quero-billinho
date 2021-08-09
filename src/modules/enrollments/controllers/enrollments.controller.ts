import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateEnrollmentDto } from '../dto/enrollments/create-enrollment.dto';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentsService } from '../services/enrollments.service';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  findAll(@Body() paginateRequestDto: PaginateRequestDto) {
    return this.enrollmentsService.findAll(paginateRequestDto);
  }
}
