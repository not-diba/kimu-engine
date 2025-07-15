import { arg, mutationField, nonNull, stringArg } from "nexus";
import type { Context } from "../context";
import { internationalizePhoneNumber } from "../utils";

export const CreateUser = mutationField('createUser', {
    type: 'User',
    args: {
        name: nonNull(stringArg()),
        email: stringArg(),
        phoneNumber: nonNull(stringArg()),
        profileImg: stringArg(),
        authProvider: nonNull(arg({ type: 'AuthProvider' })),
        providerId: nonNull(stringArg()),
        address: arg({ type: 'AddressInput' })
    },
    async resolve(_, args, ctx: Context) {
        return await ctx.prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
                phoneNumber: internationalizePhoneNumber(args.phoneNumber),
                profileImage: args.profileImg,
                authProvider: args.authProvider,
                providerId: args.providerId,
                Addresses: args.address ? {
                    create: [{
                        city: args.address.city,
                        country: args.address.country,
                        buildingType: args.address.buildingType,
                        buildingName: args.address.buildingName,
                        unitNumber: args.address.unitNumber,
                        additionalInfo: args.address.additionalInfo
                    }]
                } : undefined
            }
        });
    }
})

export const UpdateUser = mutationField('updateUser', {
    type: 'User',
    args: {
        userId: nonNull(stringArg()),
        name: stringArg(),
        email: stringArg(),
        phoneNumber: stringArg(),
        address: arg({ type: 'AddressUpdateInput' })
    },
    async resolve(_, { userId, name, email, phoneNumber, address }, ctx: Context) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = {};
        if (name !== undefined) data.name = name;
        if (email !== undefined) data.email = email;
        if (phoneNumber !== undefined) data.phoneNumber = internationalizePhoneNumber(phoneNumber!);

        if (address) {
            data.Addresses = {
                updateMany: {
                    where: { userId },
                    data: {
                        ...(address.city !== undefined && { city: address.city }),
                        ...(address.country !== undefined && { country: address.country }),
                        ...(address.buildingType !== undefined && { buildingType: address.buildingType }),
                        ...(address.buildingName !== undefined && { buildingName: address.buildingName }),
                        ...(address.unitNumber !== undefined && { unitNumber: address.unitNumber }),
                        ...(address.additionalInfo !== undefined && { additionalInfo: address.additionalInfo }),
                    }
                }
            };
        }

        return await ctx.prisma.user.update({
            where: { id: userId },
            data
        })
    }
});

export const DeleteUser = mutationField('deleteUser', {
    type: 'String',
    args: {
        userId: nonNull(stringArg()),
    },
    async resolve(_, { userId }, ctx: Context) {
        await ctx.prisma.user.delete({
            where: {
                id: userId
            }
        });

        return `User with ID: ${userId} deleted successfully.`
    }
})
