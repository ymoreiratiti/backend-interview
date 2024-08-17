import { TestBed } from '@automock/jest';
import { WaitlistService } from '../../domain/services/waitlist.service';
import { CoordinatesDto } from './coordinates.dto';
import { WaitlistHttpController } from './waitlist.http.controller';

describe(WaitlistHttpController.name, () => {
  let sut: WaitlistHttpController;
  let waitlistService: jest.Mocked<WaitlistService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WaitlistHttpController).compile();

    sut = unit;
    waitlistService = unitRef.get(WaitlistService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(waitlistService).toBeDefined();
  });

  describe('getWaitlist', () => {
    it('should be defined', async () => {
      //  Arrange
      const queryParameters: CoordinatesDto = {
        latitude: 48.712,
        longitude: -60.117,
      };
      waitlistService.getWaitlist.mockResolvedValueOnce([]);

      //  Act
      const actual = await sut.getWaitlist(queryParameters);

      //  Assert
      expect(actual).toStrictEqual([]);
      expect(waitlistService.getWaitlist).toHaveBeenCalled();
    });
  });
});
