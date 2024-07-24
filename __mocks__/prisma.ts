export const PrismaClient = jest.fn(() => ({
    document: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
}));
