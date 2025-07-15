import { OAuth2Client } from 'google-auth-library';
import { mutationField, nonNull, stringArg } from 'nexus';
import type { Context } from '../context';
import { internationalizePhoneNumber } from '../utils';

export const AuthenticateUser = mutationField('authenticateUser', {
  type: 'AuthResponse',
  args: {
    idToken: nonNull(stringArg()),
  },
  async resolve(_, { idToken }, ctx: Context) {
    const oauthClient = new OAuth2Client();

    try {
      const ticket = await oauthClient.verifyIdToken({
        idToken,
        audience:
          '633411139888-68ng93s331827ll8a1hu32e85mi531k3.apps.googleusercontent.com',
      });

      const payload = ticket.getPayload();

      if (!payload) {
        console.warn('🔴 No payload found in ID token.');
        return {
          message: 'Authentication failed: invalid token payload.',
          user: null,
        };
      }

      const { email, name, picture } = payload;

      const user = await ctx.prisma.user.upsert({
        where: { email },
        update: {
          profileImage: picture || undefined,
          name: name || undefined,
          idToken: idToken,
          authProvider: 'Google',
        },
        create: {
          email: email!,
          name: name || undefined,
          profileImage: picture || undefined,
          idToken: idToken,
          authProvider: 'Google',
        },
      });

      return {
        message: 'User authenticated successfully',
        userId: user.id,
        accessToken: 'accessToken',
      };
    } catch (error) {
      console.error('❌ Error verifying ID token:', error);
      return {
        message: 'Authentication failed: invalid token or internal error.',
        userId: null,
        token: null,
      };
    }
  },
});

export const VerifyUser = mutationField('verifyUser', {
  type: 'String',
  args: {
    userId: nonNull(stringArg()),
    phoneNumber: nonNull(stringArg()),
  },
  async resolve(_, { userId, phoneNumber }, ctx: Context) {
    try {
      await ctx.prisma.user.update({
        where: { id: userId },
        data: { phoneNumber: internationalizePhoneNumber(phoneNumber) },
      });
    } catch (e) {
      return `Error verifying user: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }

    return 'User verified successfully';
  },
});
