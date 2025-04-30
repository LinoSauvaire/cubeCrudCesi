import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
            description: 'Administrateur avec tous les droits'
        },
    });

    const userRole = await prisma.role.upsert({
        where: { name: 'user' },
        update: {},
        create: {
            name: 'user',
            description: 'Utilisateur standard avec droits limités'
        },
    });

    const managerRole = await prisma.role.upsert({
        where: { name: 'manager' },
        update: {},
        create: {
            name: 'manager',
            description: 'Gestionnaire avec droits intermédiaires'
        },
    });

    const products = [
        {
            id: '1',
            name: 'Smartphone Galaxy S23',
            description: 'Le dernier smartphone Samsung avec 256 Go de stockage et un appareil photo 108 MP',
            price: 899.99,
            stock: 45,
            imageUrl: 'https://example.com/s23.jpg',
            isActive: true,
        },
        {
            id: '2',
            name: 'iPhone 15 Pro',
            description: 'Smartphone Apple premium avec puce A17 et caméras professionnelles',
            price: 1199.99,
            stock: 30,
            imageUrl: 'https://example.com/iphone15.jpg',
            isActive: true,
        },
        {
            id: '3',
            name: 'MacBook Pro 16"',
            description: 'Ordinateur portable Apple avec puce M2 Pro, 16 Go RAM et 512 Go SSD',
            price: 2499.99,
            stock: 12,
            imageUrl: 'https://example.com/macbookpro.jpg',
            isActive: true,
        },
        {
            id: '4',
            name: 'Dell XPS 15',
            description: 'Ordinateur portable Windows avec écran InfinityEdge, Intel i7 et 1 To SSD',
            price: 1899.99,
            stock: 18,
            imageUrl: 'https://example.com/xps15.jpg',
            isActive: true,
        },
        {
            id: '5',
            name: 'iPad Air',
            description: 'Tablette Apple avec puce M1, écran Liquid Retina et compatibilité Apple Pencil',
            price: 699.99,
            stock: 50,
            imageUrl: 'https://example.com/ipadair.jpg',
            isActive: true,
        },
        {
            id: '6',
            name: 'Sony WH-1000XM5',
            description: 'Casque sans fil avec réduction de bruit active, autonomie de 30 heures',
            price: 349.99,
            stock: 60,
            imageUrl: 'https://example.com/wh1000xm5.jpg',
            isActive: true,
        },
        {
            id: '7',
            name: 'Apple AirPods Pro 2',
            description: 'Écouteurs sans fil avec réduction de bruit active et audio spatial',
            price: 249.99,
            stock: 75,
            imageUrl: 'https://example.com/airpodspro.jpg',
            isActive: true,
        },
        {
            id: '8',
            name: 'Samsung QLED 65" TV',
            description: 'Téléviseur 4K avec technologie QLED, Smart TV et HDR10+',
            price: 1299.99,
            stock: 8,
            imageUrl: 'https://example.com/qledtv.jpg',
            isActive: true,
        },
        {
            id: '9',
            name: 'Dyson V12 Detect',
            description: 'Aspirateur sans fil avec détection laser de poussière et filtration avancée',
            price: 649.99,
            stock: 25,
            imageUrl: 'https://example.com/dysonv12.jpg',
            isActive: true,
        },
        {
            id: '10',
            name: 'PlayStation 5',
            description: 'Console de jeu nouvelle génération avec SSD ultra-rapide et manette DualSense',
            price: 499.99,
            stock: 5,
            imageUrl: 'https://example.com/ps5.jpg',
            isActive: true,
        }
    ];

    console.log('Ajout des produits...');
    for (const product of products) {
        await prisma.product.upsert({
            where: {id: product.id},
            update: product,
            create: product,
        });
    }

}

main()
    .catch((e) => {
        console.error('Erreur lors du seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });