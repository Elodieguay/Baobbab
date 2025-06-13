import { test, expect } from '@playwright/test';

test('La page d’accueil s’affiche correctement', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page).toHaveTitle(/baobbab/i);
    await expect(
        page.getByRole('heading', { name: /baobbab \./i })
    ).toBeVisible();
    // Vérifie que le texte d’accueil principal est bien présent (à adapter selon ton app)
    const button = page.getByRole('button', { name: /Je me lance/i });
    await expect(button).toBeVisible();
});

test('Un utilisateur peut réserver un cours après avoir sélectionné une ville', async ({
    page,
}) => {
    await page.goto('http://localhost:5173');

    // open the select menu for cities
    await page.getByRole('combobox').click();

    // Select Nantes
    await page.getByRole('option', { name: /nantes/i }).click();

    // Click on "Je me lance"
    await page.getByRole('button', { name: /je me lance/i }).click();

    // User is redirected to the Nantes courses page
    await expect(page).toHaveURL(/\/courses\/nantes/i);
});
