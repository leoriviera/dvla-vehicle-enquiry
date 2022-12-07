# @voxasoftworks/dvla-vehicle-enquiry

A TypeScript package for the DVLA Vehicle Enquiry Service API

To get started, install the package.

```bash
npm install @voxasoftworks/dvla-vehicle-enquiry
yarn add @voxasoftworks/dvla-vehicle-enquiry
```

You'll need to register for an API key from the DVLA. You can do this [here](https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html).

Then, import the package and use it.

```typescript
import { getVehicleDetails } from '@voxasoftworks/dvla-vehicle-enquiry';

const vehicleDetails = await getVehicleDetails(
    { apiKey: process.env.API_KEY },
    { registrationNumber: 'AA19AAA' }
);
```

## Testing

To test the functions, set your DVLA testing environmet key to `API_KEY` in `.env`.
