import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { PaginateRequestDto } from '@shared/helpers/paginate-helper';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentsService } from '../services/enrollments.service';

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
