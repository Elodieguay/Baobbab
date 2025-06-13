import test, { expect } from '@playwright/test';

test('Un utilisateur peut cliquer sur un cours et voir les détails', async ({
    page,
}) => {
    await page.goto('http://localhost:5173/courses/nantes');

    // Wait until at least one course card is visible
    const courseCards = page.locator('[data-testid="course-card"]');
    const count = await courseCards.count();
    expect(count).toBeGreaterThan(0);

    // Click the "Voir plus" button inside the first card (avoids the heart button)
    const courseDetailButton = courseCards
        .first()
        .getByRole('button', { name: /Voir plus/i });

    await expect(courseDetailButton).toBeVisible();
    await courseDetailButton.click();

    // Verify redirection to the course detail page
    await expect(page).toHaveURL(/\/courses\/nantes\/.+/);

    // Check that the "Réserver un cours d'essai" button is visible
    const openModalBtn = page.getByRole('button', {
        name: /Réserver un cours d'essai/i,
    });
    await expect(openModalBtn).toBeVisible();
});
