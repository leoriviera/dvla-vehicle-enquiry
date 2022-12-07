import axios, { isAxiosError } from 'axios';

import { Vehicle } from '../types';

import { VehicleEnquiryError } from './errors/VehicleEnquiryError';

type Config = {
  readonly apiKey: string;
  readonly correlationId?: string;
  readonly baseURL?: string;
};

type VehicleRequest = {
  readonly registrationNumber: string;
};

const defaultConfig: Partial<Config> = {
  baseURL: 'https://driver-vehicle-licensing.api.gov.uk',
};

export const getVehicleDetails = async (
  c: Config,
  args: VehicleRequest
): Promise<Vehicle> => {
  const { apiKey, baseURL, correlationId } = {
    ...defaultConfig,
    ...c,
  };

  try {
    const { data } = await axios.post('/vehicle-enquiry/v1/vehicles', args, {
      baseURL,
      headers: {
        accept: 'application/json',
        'x-api-key': apiKey,
        ...(correlationId && { 'x-correlation-id': correlationId }),
      },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return Promise.reject(
        new VehicleEnquiryError(error?.response.data, {
          status: error.response?.status,
        })
      );
    }

    return Promise.reject(error);
  }
};
