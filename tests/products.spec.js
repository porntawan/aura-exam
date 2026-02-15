import { test, expect } from '@playwright/test';

test.describe('Products page', () => {

  test('search product and add to cart', async ({ page }) => {

    await page.goto('http://localhost:3000/products');

    await Promise.all([
      page.waitForResponse(resp =>
        resp.url().includes('/api/products') && resp.status() === 200
      ),
      page.getByTestId('search-input').fill('Keyboard')
    ]);

    // check result
    const product = page.getByTestId('product-card')
      .filter({ hasText: 'Keyboard' });

    await expect(product).toHaveCount(1);

    // add to cart
    await product.getByTestId('add-btn').first().click();

    // check cart
    const cartItem = page.getByTestId('cart-item')
      .filter({ hasText: 'Keyboard' });

    await expect(cartItem).toBeVisible();

    // qty=1
    await expect(
      cartItem.getByTestId('cart-qty')
    ).toHaveText('1');

    // add to cart again
    await product.getByTestId('add-btn').first().click();

    // qty=2
    await expect(
      cartItem.getByTestId('cart-qty')
    ).toHaveText('2');

  });

});
