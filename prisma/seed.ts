import { db } from "../src/utils/prisma";
import { readFileSync } from "fs";
export type Product = {
    name: string;
    price: number;
    category: string;
    gender: string;
    imageUrl: string;
    description: string;
    color: string;
    size: "S" | "M" | "L";
};

const products = JSON.parse(readFileSync("allData.json", "utf-8"));
const removedDuplicates = products.filter(
    (value, index, self) =>
        index === self.findIndex((t) => t.images[1] === value.images[1])
);

const seed = async () => {
    await db.product.deleteMany({});
    await db.size.deleteMany({});
    await db.color.deleteMany({});
    for (const product of removedDuplicates) {
        const existingSizes = await db.size.findMany({
            where: {
                value: {
                    in: product.sizes.map((size) => size.value),
                },
            },
        });

        console.log(product.sizes);

        const existingSizeMap = existingSizes.reduce((acc, size) => {
            acc[size.value] = size;
            return acc;
        }, {});

        const sizesToConnect: any = [];
        const sizesToCreate: any = [];

        product.sizes.forEach((size) => {
            if (existingSizeMap[size.value]) {
                sizesToConnect.push(existingSizeMap[size.value]);
            } else {
                sizesToCreate.push({ value: size.value, label: size.label });
            }
        });

        console.log(
            "sizesToConnect",
            sizesToConnect,
            "sizesToCreate",
            sizesToCreate
        );
        await db.product.create({
            data: {
                title: product.title,
                category: product.category,
                description: product.description,
                price: Number(product.price),
                colors: {
                    create: product.colors,
                },
                Sizes: {
                    connect: sizesToConnect.map((size) => ({ id: size.id })),
                    create: sizesToCreate,
                },
                images: product.images,
            },
        });
        console.log("done", product.title);
    }
};

seed();
