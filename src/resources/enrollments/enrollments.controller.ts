import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { PaginateRequestDto } from '../../shared/paginate';
import { AuthGuard } from '@nestjs/passport';

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
