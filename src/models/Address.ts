import { inputObjectType, objectType } from "nexus";

export const AddressInput = inputObjectType({
  name: 'AddressInput',
  definition(t) {
    t.nonNull.string('city');
    t.nonNull.string('country');
    t.nonNull.field('buildingType', { type: 'BuildingType' });
    t.nonNull.string('buildingName');
    t.string('unitNumber');
    t.string('additionalInfo');
  },
});

export const AddressUpdateInput = inputObjectType({
  name: 'AddressUpdateInput',
  definition(t) {
    t.string('city');
    t.string('country');
    t.field('buildingType', { type: 'BuildingType' });
    t.string('buildingName');
    t.string('unitNumber');
    t.string('additionalInfo');
  },
});

export const Address = objectType({
    name: 'Address',
    definition(t) {
        t.nonNull.string('city');
        t.nonNull.string('country');
        t.nonNull.field('buildingType', { type: 'BuildingType' });
        t.nonNull.string('buildingName');
        t.string('unitNumber');
        t.string('additionalInfo');
    },
})