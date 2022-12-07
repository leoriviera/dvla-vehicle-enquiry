enum TaxStatus {
  TAXED = 'Taxed',
  UNTAXED = 'Untaxed',
  SORN = 'SORN',
  NOT_TAXED = 'Not Taxed for on Road Use',
}

enum MOTStatus {
  VALID = 'Valid',
  NOT_VALID = 'Not valid',
  NO_RESULTS = 'No results returned',
  NO_DETAILS = 'No details held by DVLA',
}

export type Vehicle = {
  readonly registrationNumber: string;
  readonly taxStatus?: `${TaxStatus}`;
  readonly taxDueDate?: string;
  readonly artEndDate?: string;
  readonly motStatus?: `${MOTStatus}`;
  readonly motExpiryDate?: string;
  readonly make?: string;
  readonly monthOfFirstRegistration?: string;
  readonly monthOfFirstDvlaRegistration?: string;
  readonly yearOfManufacture?: number;
  readonly engineCapacity?: number;
  readonly co2Emissions?: number;
  readonly fuelType?: string;
  readonly markedForExport?: boolean;
  readonly colour?: string;
  readonly typeApproval?: string;
  readonly wheelplan?: string;
  readonly revenueWeight?: number;
  readonly realDrivingEmissions?: string;
  readonly dateOfLastV5CIssued?: string;
  readonly euroStatus?: string;
  readonly automatedVehicle?: string;
};
