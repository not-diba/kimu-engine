import { arg, mutationField, nonNull } from "nexus";
import type { Context } from "../context";
import { PaymentStatus } from "../../generated/prisma";

export const CreatePayment = mutationField('createPayment', {
    type: 'Payment',
    args: {
        input: nonNull(arg({ type: 'PaymentInput' }))
    },
    async resolve(_, { input }, ctx: Context) {
        return ctx.prisma.payment.create({
            data: {
                amount: input.amount,
                method: input.method,
                status: PaymentStatus.Pending
            }
        })
    }
})
