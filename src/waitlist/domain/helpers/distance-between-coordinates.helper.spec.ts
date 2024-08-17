import { describe, expect, it } from '@jest/globals';
import { type LocationModel } from '../models/location.model';
import { distanceBetweenCoordinates } from './distance-between-coordinates.helper';

describe(distanceBetweenCoordinates.name, () => {
  it('should calculate distance between coordinates in the Northern and Southern Hemispheres', () => {
    //  Arrange
    const locationA: LocationModel = { latitude: 46.711, longitude: -63.115 };
    const locationB: LocationModel = { latitude: -81.0341, longitude: 144.9963 };

    //  Act
    const actual = distanceBetweenCoordinates(locationA, locationB);

    //  Assert
    expect(actual).toBe(244.190_752_817_751_08);
  });

  it('should calculate distance between coordinates in the Southern Hemisphere', () => {
    //  Arrange
    const locationA: LocationModel = { latitude: -35.5336, longitude: -25.2795 };
    const locationB: LocationModel = { latitude: -75.6334, longitude: -165.891 };

    //  Act
    const actual = distanceBetweenCoordinates(locationA, locationB);

    //  Assert
    expect(actual).toBe(146.217_604_590_863_12);
  });
});
