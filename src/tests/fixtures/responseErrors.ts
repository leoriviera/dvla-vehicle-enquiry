export const responseErrors = [
  {
    vehicleRegistration: 'ER19BAD',
    errors: [
      {
        status: '400',
        code: '400',
        title: 'Bad Request',
        detail: 'Invalid format for field - vehicle registration number',
      },
    ],
  },
  {
    vehicleRegistration: 'ER19NFD',
    errors: [
      {
        status: '404',
        code: '404',
        title: 'Vehicle Not Found',
        detail: 'Record for vehicle not found',
      },
    ],
  },
  {
    vehicleRegistration: 'ER19ERR',
    errors: [
      {
        status: '500',
        code: '500',
        title: 'Internal Server Error',
        detail: 'System Error occurred',
      },
    ],
  },
  {
    vehicleRegistration: 'ER19MNT',
    errors: [
      {
        status: 503,
        title: 'System currently down for maintenance',
        detail:
          'The service is currently down for maintenance, please contact support for more information',
      },
    ],
  },
];
