import { Injectable } from '@nestjs/common';

@Injectable()
export class WaitlistService {
  async getWaitlist(coordinates: { latitude: number; longitude: number }): Promise<string> {
    return `Waitlist for coordinates: (${coordinates.latitude}, ${coordinates.longitude})`;
  }
}
