import { objectType } from 'nexus';

export const AuthResponse = objectType({
  name: 'AuthResponse',
  definition(t) {
    t.nonNull.string('message');
    t.field('user', { type: 'User' });
    t.string('token'); 
  },
});
