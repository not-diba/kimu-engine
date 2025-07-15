import { enumType, objectType } from 'nexus';
import type { Context } from '../context';

export const AuthProviderEnum = enumType({
  name: 'AuthProvider',
  members: ['Google', 'Apple', 'TikTok', 'Meta'],
});

export const BuildingTypeEnum = enumType({
  name: 'BuildingType',
  members: ['Apartment', 'House', 'Office', 'Hotel', 'Other'],
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.nonNull.string('email');
    t.string('phoneNumber');
    t.string('profileImage');
    t.nonNull.field('authProvider', { type: 'AuthProvider' });
    t.nonNull.string('idToken');
    t.nonNull.dateTime('createdAt');
    t.nonNull.dateTime('updatedAt');
    t.list.field('addresses', {
      type: 'Address',
      async resolve(user, _, ctx: Context) {
        const foundUser = await ctx.prisma.user.findUnique({
          where: { id: user.id },
          include: { Addresses: true },
        });
        return foundUser?.Addresses ?? [];
      },
    });
  },
});
