import { OAuth2Client } from "google-auth-library";
import { mutationField, nonNull, stringArg } from "nexus";
import type { Context } from "../context";

export const AuthenticateUser = mutationField('authenticateUser', {
  type: 'AuthResponse',
  args: {
    idToken: nonNull(stringArg()),
  },
  async resolve(_, { idToken }, ctx: Context) {
    const oauthClient = new OAuth2Client();
    let user = null;

    try {
      const ticket = await oauthClient.verifyIdToken({
        idToken,
        audience: '633411139888-68ng93s331827ll8a1hu32e85mi531k3.apps.googleusercontent.com',
      });

      const payload = ticket.getPayload();

      if (!payload) {
        console.warn('🔴 No payload found in ID token.');
        return {
          message: 'Authentication failed: invalid token payload.',
          user: null,
        };
      }

      const { email, name } = payload;

      console.log('🟢 Google user:', { name, email });

      user = await ctx.prisma.user.findFirst({
        where: { email: email! },
        include: {
          Addresses: true,
        }
      });

      // if (!user) {
      //   // Optionally create user if not found
      //   user = await ctx.prisma.user.create({
      //     data: {
      //       name: name || '',
      //       email,
      //       profileImage: picture, 
      //       authProvider: 'Google',
      //       providerId: payload.sub,
      //     },
      //   });
      // }

      return {
        message: 'User authenticated successfully',
        user: {
          id: user?.id || '',
          name: user?.name || name || '',
          phoneNumber: user?.phoneNumber || '',
          providerId: user?.providerId || payload.sub,
          createdAt: user?.createdAt,
          profileImg: user?.profileImage,
          authProvider: user?.authProvider || 'Google',
          addresses: user?.Addresses || [],
          updatedAt: user?.updatedAt,
        },
      };
    } catch (error) {
      console.error('❌ Error verifying ID token:', error);
      return {
        message: 'Authentication failed: invalid token or internal error.',
        user: null,
      };
    }
  },
});
