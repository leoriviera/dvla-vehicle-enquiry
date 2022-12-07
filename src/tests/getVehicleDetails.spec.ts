import test from 'ava';
import dotenv from 'dotenv';

dotenv.config();

import { VehicleEnquiryError } from '../lib/errors/VehicleEnquiryError';
import { getVehicleDetails } from '../lib/getVehicleDetails';

import { successResponses } from './fixtures';
import { responseErrors } from './fixtures/responseErrors';

const config = {
  apiKey: process.env.API_KEY ?? '',
  baseURL: 'https://uat.driver-vehicle-licensing.api.gov.uk',
};

test('requests for vehicle details resolve properly', async (t) => {
  const responses = await Promise.all(
    successResponses.map(
      async (r) =>
        await getVehicleDetails(config, {
          registrationNumber: r.registrationNumber,
        })
    )
  );

  t.is(responses.length, successResponses.length);
  t.deepEqual(responses, successResponses);
});

test('bad requests for vehicle details reject properly', async (t) => {
  const returnError = async <U>(p: Promise<unknown>): Promise<U> => {
    try {
      await p;

      // This should never happen, as the promise should reject
      return {} as U;
    } catch (error) {
      return error as U;
    }
  };

  const registrations = responseErrors.map((r) => r.vehicleRegistration);
  const errors = responseErrors.map((r) => r.errors);

  const responses = await Promise.all(
    registrations.map((r) =>
      returnError<VehicleEnquiryError>(
        getVehicleDetails(config, { registrationNumber: r })
      )
    )
  );

  const expectedResponses = errors.map(
    (e) =>
      new VehicleEnquiryError({
        errors: e,
      })
  );

  t.is(responses.length, registrations.length);
  t.deepEqual(responses, expectedResponses);
  t.deepEqual(
    responses.map((r) => r.allErrors),
    errors
  );
});

test('429 error rejects properly', async (t) => {
  const response = (await t.throwsAsync(
    getVehicleDetails(config, {
      registrationNumber: 'ER19THR',
    })
  )) as VehicleEnquiryError;

  const expectedResponse = new VehicleEnquiryError(
    {
      message: 'Too Many Requests',
    },
    {
      status: 429,
    }
  );

  t.is(response.status, '429');
  t.deepEqual(response, expectedResponse);
});

test('a missing token returns a forbidden error', async (t) => {
  const response = (await t.throwsAsync(
    getVehicleDetails(
      {
        apiKey: '',
      },
      { registrationNumber: successResponses[0].registrationNumber }
    )
  )) as VehicleEnquiryError;

  const expectedResponse = new VehicleEnquiryError(
    {
      message: 'Forbidden',
    },
    {
      status: 403,
    }
  );

  t.is(response.status, '403');
  t.deepEqual(response, expectedResponse);
});
