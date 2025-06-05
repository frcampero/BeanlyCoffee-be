"use strict";
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createCoreController } = require("@strapi/strapi").factories;
const ARS_TO_USD_RATE = 1000;
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        const { products } = ctx.request.body; // Array documentId strings
        console.log("🧾 DocumentIDs recibidos en backend:", products);
        try {
            const lineItems = await Promise.all(products.map(async (documentId) => {
                console.log("🔍 Buscando producto con documentId:", documentId);
                const items = await strapi.entityService.findMany("api::product.product", {
                    filters: { documentId },
                    populate: ["images", "category"],
                });
                const item = items[0];
                console.log("📦 Producto encontrado:", item);
                if (!item) {
                    ctx.throw(404, `Producto no encontrado con documentId: ${documentId}`);
                }
                // Convert ARS to USD
                const priceUSD = item.price / ARS_TO_USD_RATE;
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.productName,
                        },
                        unit_amount: Math.round(priceUSD * 100),
                    },
                    quantity: 1,
                };
            }));
            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: {
                    allowed_countries: ["AR"],
                },
                payment_method_types: ["card"],
                mode: "payment",
                success_url: process.env.CLIENT_URL + "/success",
                cancel_url: process.env.CLIENT_URL + "/successError",
                line_items: lineItems,
            });
            await strapi.service("api::order.order").create({
                data: {
                    products,
                    stripeId: session.id,
                },
            });
            return { stripeSession: session };
        }
        catch (error) {
            console.error("❌ Error en backend:", error.message);
            ctx.throw(500, error.message);
        }
    },
}));
