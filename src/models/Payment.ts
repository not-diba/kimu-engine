import { enumType, inputObjectType, objectType } from "nexus";

export const PaymentMethodEnum = enumType({
    name: 'PaymentMethod',
    members: ['Mobile', 'Card']
})

export const PaymentStatusEnum = enumType({
    name: 'PaymentStatus',
    members: ['Complete', 'Pending', 'Failed', 'Error']
})

export const PaymentInput = inputObjectType({
    name: 'PaymentInput',
    definition(t) {
        t.nonNull.string('amount')
        t.nonNull.field('method', { type: 'PaymentMethod' })
    },
})

export const Payment = objectType({
    name: 'Payment',
    definition(t) {
        t.nonNull.string('amount')
        t.nonNull.field('method', { type: 'PaymentMethod' })
        t.nonNull.field('status', { type: 'PaymentStatus' })
        t.nonNull.dateTime('createdAt')
        t.nonNull.dateTime('updatedAt')
    },
})