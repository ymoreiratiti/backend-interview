import { Controller, Get, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationModel } from '../../domain/models/location.model';
import { WaitlistService } from '../../domain/services/waitlist.service';
import { CoordinatesDto } from './coordinates.dto';

@Controller('waitlist')
@ApiTags('waitlist')
export class WaitlistHttpController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Get()
  @ApiOperation({ summary: 'Get waitlist by coordinates', description: 'return the ' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Waitlist for the given coordinates' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid parameters' })
  @ApiQuery({ name: 'longitude', type: Number, description: 'Longitude of the location facility', required: true })
  @ApiQuery({ name: 'latitude', type: Number, description: 'Latitude of the location facility', required: true })
  @UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true })) // Enables validation and transformation
  async getWaitlist(@Query() coordinates: CoordinatesDto) {
    const command: LocationModel = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    return this.waitlistService.getWaitlist(command);
  }
}
