const { Schema, model } = require("mongoose");

const departmentsNPSchema = new Schema({
  SiteKey: {
    type: Number,
  },
  Description: {
    type: String,
  },
  DescriptionRu: {
    type: String,
  },
  ShortAddress: {
    type: String,
  },
  ShortAddressRu: {
    type: String,
  },
  Phone: {
    type: String,
  },
  TypeOfWarehouse: {
    type: String,
  },
  Ref: {
    type: String,
  },
  Number: {
    type: String,
  },
  CityRef: {
    type: String,
  },
  CityDescription: {
    type: String,
  },
  CityDescriptionRu: {
    type: String,
  },
  SettlementRef: {
    type: String,
  },
  SettlementDescription: {
    type: String,
  },
  SettlementAreaDescription: {
    type: String,
  },
  SettlementRegionsDescription: {
    type: String,
  },
  SettlementTypeDescription: {
    type: String,
  },
  SettlementTypeDescriptionRu: {
    type: String,
  },
  Longitude: {
    type: String,
  },
  Latitud: {
    type: String,
  },
  PostFinance: {
    type: String,
  },
  BicycleParking: {
    type: String,
  },
  PaymentAccess: {
    type: String,
  },
  POSTerminal: {
    type: String,
  },
  InternationalShipping: {
    type: String,
  },
  SelfServiceWorkplacesCount: {
    type: String,
  },
  TotalMaxWeightAllowed: {
    type: String,
  },
  PlaceMaxWeightAllowed: {
    type: String,
  },
  SendingLimitationsOnDimensions: {
    Width: {
      type: Number,
    },
    Height: {
      type: Number,
    },
    Length: {
      type: Number,
    },
  },
  ReceivingLimitationsOnDimensions: {
    Width: {
      type: Number,
    },
    Height: {
      type: Number,
    },
    Length: {
      type: Number,
    },
  },
  Reception: {
    Monday: {
      type: String,
    },
    Tuesday: {
      type: String,
    },
    Wednesday: {
      type: String,
    },
    Thursday: {
      type: String,
    },
    Friday: {
      type: String,
    },
    Saturday: {
      type: String,
    },
    Sunday: {
      type: String,
    },
  },
  Delivery: {
    Monday: {
      type: String,
    },
    Tuesday: {
      type: String,
    },
    Wednesday: {
      type: String,
    },
    Thursday: {
      type: String,
    },
    Friday: {
      type: String,
    },
    Saturday: {
      type: String,
    },
    Sunday: {
      type: String,
    },
  },
  Schedule: {
    Monday: {
      type: String,
    },
    Tuesday: {
      type: String,
    },
    Wednesday: {
      type: String,
    },
    Thursday: {
      type: String,
    },
    Friday: {
      type: String,
    },
    Saturday: {
      type: String,
    },
    Sunday: {
      type: String,
    },
  },
  DistrictCode: {
    type: String,
  },
  WarehouseStatus: {
    type: String,
  },
  WarehouseStatusDate: {
    type: String,
  },
  WarehouseIllusha: {
    type: String,
  },
  CategoryOfWarehouse: {
    type: String,
  },
  Direct: {
    type: String,
  },
  RegionCity: {
    type: String,
  },
  WarehouseForAgent: {
    type: String,
  },
  GeneratorEnabled: {
    type: String,
  },
  MaxDeclaredCost: {
    type: String,
  },
  WorkInMobileAwis: {
    type: String,
  },
  DenyToSelect: {
    type: String,
  },
  CanGetMoneyTransfer: {
    type: String,
  },
  HasMirror: {
    type: String,
  },
  HasFittingRoom: {
    type: String,
  },
  OnlyReceivingParcel: {
    type: String,
  },
  PostMachineType: {
    type: String,
  },
  PostalCodeUA: {
    type: String,
  },
  WarehouseIndex: {
    type: String,
  },
  BeaconCode: {
    type: String,
  },
  CreateAt: {
    type: String,
  },
});

const DepartmentsNP = model("departmentsNP", departmentsNPSchema);

module.exports = DepartmentsNP;
