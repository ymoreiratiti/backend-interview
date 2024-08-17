import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('GET /waitlist - Should return 400 Bad Request if query parameters are invalid', async () => {
    //  Act
    const response = await request(app.getHttpServer()).get('/waitlist');

    //  Assert
    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body).toStrictEqual({
      message: [
        'latitude should not be null or undefined',
        'latitude must be a latitude string or number',
        'longitude should not be null or undefined',
        'longitude must be a longitude string or number',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('GET /waitlist - Should return 200 OK if query parameters are valid', async () => {
    //  Act
    const response = await request(app.getHttpServer())
      .get('/waitlist')
      .query({ latitude: '48.7120', longitude: '-60.1170' });

    //  Assert
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toHaveLength(10);
    expect(response.body[0]).toStrictEqual({
      id: '213097a3-cae1-48cf-b266-a361a972ff27',
      name: 'Tamara Roberts',
      location: { latitude: '68.8129', longitude: '71.3018' },
      age: 51,
      acceptedOffers: 100,
      canceledOffers: 2,
      averageReplyTime: 87,
      totalOffers: 102,
      distanceToFacility: 132.947_159_331_254_62,
      ageNormalize: 0.434_782_608_695_652_16,
      distanceToFacilityNormalize: 0.485_638_608_405_210_8,
      acceptedOffersNormalize: 1,
      canceledOffersNormalize: 0.02,
      averageReplyTimeNormalize: 0.023_922_114_047_287_9,
      score: 8.841_299_772_195_864,
    });
  });
});
