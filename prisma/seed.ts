
import { PrismaClient, OrderStatus } from '@prisma/client';


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

    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.product.deleteMany({});
    
    const products = [
        {
            name: 'Smartphone XYZ',
            description: 'Le dernier smartphone avec des fonctionnalités avancées',
            price: 599.99,
            stock: 50,
            imageUrl: '/images/products/smartphone.jpg'
        },
        {
            name: 'Ordinateur portable ProBook',
            description: 'Idéal pour les professionnels et les étudiants',
            price: 899.99,
            stock: 30,
            imageUrl: '/images/products/laptop.jpg'
        },
        {
            name: 'Écouteurs sans fil',
            description: 'Son de haute qualité avec réduction de bruit',
            price: 129.99,
            stock: 100,
            imageUrl: '/images/products/headphones.jpg'
        },
        {
            name: 'Montre connectée SportTrack',
            description: 'Suivez votre activité physique et vos performances',
            price: 199.99,
            stock: 45,
            imageUrl: '/images/products/smartwatch.jpg'
        },
        {
            name: 'Tablette GraphicPad',
            description: 'Parfaite pour les graphistes et les artistes',
            price: 349.99,
            stock: 25,
            imageUrl: '/images/products/tablet.jpg'
        },
        {
            name: 'Camera 4K Pro',
            description: 'Camera professionnelle haute définition',
            price: 799.99,
            stock: 15,
            imageUrl: '/images/products/camera.jpg'
        },
        {
            name: 'Console de jeux NextGen',
            description: 'La dernière console de jeux avec graphismes 4K',
            price: 499.99,
            stock: 35,
            imageUrl: '/images/products/console.jpg'
        },
        {
            name: 'Enceinte Smart Sound',
            description: 'Enceinte connectée avec assistant vocal',
            price: 149.99,
            stock: 60,
            imageUrl: '/images/products/speaker.jpg'
        }
    ];

    const createdProducts = [];
    for (const product of products) {
        const createdProduct = await prisma.product.create({
            data: product
        });
        createdProducts.push(createdProduct);
    }

    let orderCounter = 0;

    const generateOrderReference = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const orderNumber = (100 + orderCounter++).toString();
        return `CMD-${year}${month}${orderNumber}`;
    };


    const generateOrderStatus = (date: Date) => {
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff > 30) {
            const rand = Math.random();
            if (rand < 0.8) return OrderStatus.DELIVERED;
            if (rand < 0.9) return OrderStatus.CANCELLED;
            return OrderStatus.SHIPPED;
        } else if (daysDiff > 14) {
            const rand = Math.random();
            if (rand < 0.6) return OrderStatus.DELIVERED;
            if (rand < 0.8) return OrderStatus.SHIPPED;
            if (rand < 0.9) return OrderStatus.PROCESSING;
            return OrderStatus.CANCELLED;
        } else if (daysDiff > 7) {
            const rand = Math.random();
            if (rand < 0.4) return OrderStatus.DELIVERED;
            if (rand < 0.7) return OrderStatus.SHIPPED;
            if (rand < 0.9) return OrderStatus.PROCESSING;
            return OrderStatus.PENDING;
        } else {
            const rand = Math.random();
            if (rand < 0.2) return OrderStatus.DELIVERED;
            if (rand < 0.4) return OrderStatus.SHIPPED;
            if (rand < 0.7) return OrderStatus.PROCESSING;
            return OrderStatus.PENDING;
        }
    };
    const now = new Date();
    const orders = [];

    for (let month = 0; month < 6; month++) {
        const monthDate = new Date();
        monthDate.setMonth(now.getMonth() - month);

        const orderCount = month === 0 ? 15 : 10 - month;

        for (let i = 0; i < orderCount; i++) {
            const orderDate = new Date(
                monthDate.getFullYear(),
                monthDate.getMonth(),
                Math.floor(Math.random() * 28) + 1
            );

            const itemsCount = Math.floor(Math.random() * 3) + 1;
            const selectedProducts = [];
            const usedProducts = new Set();

            for (let j = 0; j < itemsCount; j++) {
                let productIndex;
                do {
                    productIndex = Math.floor(Math.random() * createdProducts.length);
                } while (usedProducts.has(productIndex));

                usedProducts.add(productIndex);
                const product = createdProducts[productIndex];
                const quantity = Math.floor(Math.random() * 3) + 1;

                selectedProducts.push({
                    product,
                    quantity,
                    unitPrice: product.price
                });
            }

            const totalAmount = selectedProducts.reduce(
                (sum, item) => sum + item.unitPrice * item.quantity,
                0
            );

            const status = generateOrderStatus(orderDate);

            const order = await prisma.order.create({
                data: {
                    reference: generateOrderReference(orderDate),
                    createdAt: orderDate,
                    updatedAt: orderDate,
                    status,
                    totalAmount,
                }
            });

            orders.push(order);
        }
    }


    console.log(`Seed terminé: ${products.length} produits et ${orders.length} commandes créés`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });