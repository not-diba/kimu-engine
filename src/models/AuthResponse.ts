import { objectType } from 'nexus';

export const AuthResponse = objectType({
  name: 'AuthResponse',
  definition(t) {
    t.nonNull.string('message');
    t.string('userId');
    t.string('accessToken');
  },
});
