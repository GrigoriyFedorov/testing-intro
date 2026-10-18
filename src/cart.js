function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }

  const existing = cart.find((item) => item.id === product.id);
  const newQuantity = (existing ? existing.quantity : 0) + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError("Нельзя добавить больше, чем есть на складе");
  }

  if (existing) {
    return cart.map((item) =>
      item.id === existing.id ? { ...item, quantity: newQuantity } : item,
    );
  }

  return [...cart, { ...product, quantity: quantity }];
}
function changeQuantity(cart, productId, newQuantity) {
  if (newQuantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }

  const existing = cart.find((item) => item.id === productId);

  if (!existing) {
    return cart;
  }

  if (newQuantity > existing.stock) {
    throw new RangeError("Нельзя добавить больше, чем есть на складе");
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity: newQuantity } : item,
  );
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promo) {
  const FREE_DELIVERY_FROM = 50000;
  const DELIVERY_PRICE = 30000;
  const PROMO_CODE = "SAVE10";
  const PROMO_MIN_SUBTOTAL = 20000;
  const PROMO_PERCENT = 10;

  const subtotal = calculateCartSubtotal(cart);
  const delivery = subtotal < FREE_DELIVERY_FROM ? DELIVERY_PRICE : 0;
  const discount =
    promo === PROMO_CODE && subtotal >= PROMO_MIN_SUBTOTAL
      ? Math.round(subtotal / PROMO_PERCENT)
      : 0;
  const total = subtotal + delivery - discount;

  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
