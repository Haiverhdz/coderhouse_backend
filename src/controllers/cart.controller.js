import CartService from "../services/carts.service.js";
import TicketService from "../services/Ticket.service.js";
import ProductService from "../services/Product.service.js";

const cartService = new CartService();
const ticketService = new TicketService();
const productService = new ProductService();

export const finallyPurchase = async (req, res) => {
    try {
        const { cid } = req.params;
        const user = req.user; 
        const cart = await cartService.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        let totalAmount = 0;
        let purchasedProducts = [];
        let notPurchasedProducts = [];

        for (const item of cart.products) {
            const product = await productService.getProductById(item.product._id);

            if (!product) continue;

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await productService.updateProduct(product._id, { stock: product.stock });

                totalAmount += item.quantity * product.price;
                purchasedProducts.push(item);
            } else {
                notPurchasedProducts.push(item.product._id);
            }
        }

        if (purchasedProducts.length > 0) {
            const ticket = await ticketService.createTicket({
                amount: totalAmount,
                purchaser: user.email,
            });
            await cartService.updateCart(cid, notPurchasedProducts);

            return res.json({
                message: "Compra realizada con éxito",
                ticket,
                notPurchasedProducts,
            });
        }

        return res.json({
            message: "No se pudo completar la compra. Productos sin stock suficiente",
            notPurchasedProducts,
        });

    } catch (error) {
        return res.status(500).json({ message: "Error en la compra", error: error.message });
    }
}