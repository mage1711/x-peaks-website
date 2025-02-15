// This is your test secret API key.
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

let baseUrl = `${window.location.protocol}//${window.location.host}/`;

const createStripeSession = async (
  currency,
  product_name,
  product_image_url,
  price,
  couponId = null,
  quantity = 1
) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: product_name + " - Deposit",
            description:
              "30% deposit due now, the remainder will be charged 6 weeks prior to the start. Free cancellation until then.",
            images: [product_image_url],
          },
          unit_amount: price * 100 * 0.3,
        },
        quantity: quantity,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}success?coupon=${couponId || ''}`,
    cancel_url: window.location.href,
    metadata: {
      couponId: couponId
    }
  });

  window.location = session.url;
};

export { createStripeSession };
