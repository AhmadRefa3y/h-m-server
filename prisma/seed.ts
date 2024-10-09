import { readFile } from "fs/promises";
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

// const products: Product[] = [
//     {
//         name: "كنزة بقبة مستديرة",
//         price: 799,
//         description:
//             "بلوزة بأكمام طويلة من قماش ناعم. قبة مستديرة من نسيج مضلع حول القبة وأطراف الأكمام والحافة، أكتاف منخفضة.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:0dbc69dd-fcf5-4015-a2d5-2ef14d2c4dbd/as/EID-d835a589fd0023048b12c4441449f3b9efc69eb9.jpg?width=450&height=675&preferwebp=true",
//         category: "shirt",
//         gender: "kids",
//         color: "blue",
//         size: "S",
//     },
//     {
//         name: "جينز بقصّة ساق مستقيمة",
//         price: 1699,
//         description:
//             "جينز بخمسة جيوب من قطن الدنيم المكحوت بتصميم خصر مطاطي قابل للتعديل لملاءمة مثالية، بالإضافة إلى سحاب مع زر كبس. يتميز بقصّة عادية عند الورك والفخذ مع ساق مستقيمة.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:0abc7419-a219-4f0c-b774-7dfb964d2241/as/EID-bd03c489da7adc0123d1d04afa24fabc056842d0.jpg?width=420&height=630&preferwebp=true",
//         category: "jeans",
//         gender: "kids",
//         color: "white",
//         size: "L",
//     },
//     {
//         name: "تي شيرت بأكمام طويلة",
//         price: 749,
//         description:
//             "تي-شيرت فضفاض مصنوع من قطن الجيرسيه الناعم بحواف مرنة حول القبة، وجيب مفتوح على الصدر، وأكتاف منخفضة، وأكمام طويلة.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:ee93e5d0-277a-4271-bdf4-3616c5a1cc49/as/EID-836baa57a6cb7233ea53e4f1ac8226f41dd27695.jpg?width=450&height=675&preferwebp=true",
//         category: "shirt",
//         gender: "kids",
//         color: "blue",
//         size: "M",
//     },
//     {
//         name: "جاكيت من مزيج الصوف بقصّة عادية",
//         price: 3999,
//         description:
//             "جاكيت من مزيج الصوف واللباد الذي يأتي بتصميم ياقة مع أزرار أمامية وطية صغيرة من الخلف، وحافة سفلية مستقيمة. ينفرد الجاكيت بجيوب أمامية وجيب داخلي، وبطانة داخلية. يمتاز التصميم بقصّة عادية لتوفير الراحة أثناء الارتداء والإطلالة الكلاسيكية الرائعة.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:f58c4cc8-2d37-425c-b574-04d4b6eb4740/as/EID-a688fd309a5282bd1060d585d6693f9c45779df9.jpg?width=450&height=675&preferwebp=true",
//         category: "jacket",
//         gender: "men",
//         color: "blue",
//         size: "L",
//     },
//     {
//         name: "جاكيت منفوخ وخفيف الوزن بقصّة سلِم",
//         price: 2499,
//         description:
//             "جاكيت منفوخ منسوج من قماش مُبطن وخفيف الوزن بتصميم غطاء رأس، وسحّاب بطول الأمام مزوّد ببطانة واقية للذقن، وأكمام طويلة، وجيوب في الدرزات الجانبية مزوّدة بسحّاب مخفي، وأجزاء مرنة على الأساور. تكتمل أناقة هذا الجاكيت غير المُبطن بقصّة سلِم تحتضن الجسم وتتكيّف مع منحنياته لإبراز جمال قوامك.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:2c0bc3c6-263d-4971-b852-3dc27095c4fe/as/EID-5b8828545778e28073d10259681a3b1ebf70176b.jpg?width=420&height=630&preferwebp=true",
//         category: "jacket",
//         gender: "men",
//         color: "black",
//         size: "S",
//     },
//     {
//         name: "قبعة كاب بنقشة مطرزة",
//         price: 2499,
//         description:
//             "قبعة كاب من نسيج التويل مصنوعة من مزيج الصوف، ومزينة بزخرفة مطرزة من الأمام، وثقوب مطرزة من الأعلى، وإبزيم بلاستيكي قابل للتعديل من الخلف. مزودة بشريط يمتص العرق مصنوع من القطن.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:79a6bc0e-41d5-4a2e-afcf-51fb0828fd6b/as/EID-13dbfb907a42cf0ce0ef269873dd897cc6887490.jpg?width=420&height=630&preferwebp=true",
//         category: "cap",
//         gender: "men",
//         color: "black",
//         size: "S",
//     },
//     {
//         name: "بنطلون رياضي واسع",
//         price: 1199,
//         description:
//             "بنطلون رياضي فضفاض واسع الساق منسوج من قماش سويت-شيرت ناعم من الداخل، يتميز بخصر عالي ورباط سحب مطاطي مخفي، كما يمتاز بجيوب جانبية مخفية وجيب خلفي مفتوح.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:c6a1af72-b4f0-48e6-9468-680f6c78917e/as/EID-c92ad9a932c6d1c75534a8e379971b723c449fac.jpg?width=450&height=675&preferwebp=true",
//         category: "joggers",
//         gender: "women",
//         color: "blue",
//         size: "S",
//     },
//     {
//         name: "قميص بوسادات كتف وخصر مدبّب",
//         price: 1099,
//         description:
//             "قميص أنيق من قماش البوبلين المضلّع، ينفرد بتصميم ياقة مدببة وأزرار بطول الجزء الأمامي. بالإضافة إلى وسادات كتف وخصر ضيق وأكمام طويلة تنتهي بفتحة وأزرار عند الأكمام وحافة سفلية مستديرة.",
//         imageUrl:
//             "https://media.alshaya.com/adobe/assets/urn:aaid:aem:97439ef2-ab52-4455-970d-8536bafc306b/as/EID-75ef58d672b186dfc812cdcbbd7a2c045c8c34c8.jpg?width=420&height=630&preferwebp=true",
//         category: "shirt",
//         gender: "women",
//         color: "white",
//         size: "L",
//     },
// ];

const products = JSON.parse(readFileSync("allData.json", "utf-8"));
console.log(products);

const seed = async () => {
    products.forEach(async (product) => {
        await db.product.create({
            data: {
                title: product.title,
                category: product.category,
                description: product.description,
                price: product.price,
                colors: {
                    createMany: {
                        data: product.colors,
                    },
                },
                Sizes: {
                    createMany: {
                        data: product.sizes,
                    },
                },
                images: product.images,
            },
        });
    });
};

seed();
