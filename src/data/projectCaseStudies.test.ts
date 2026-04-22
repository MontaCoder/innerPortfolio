import { describe, expect, it } from 'vitest';
import { PROJECT_CASE_STUDIES } from './projectCaseStudies';

describe('PROJECT_CASE_STUDIES', () => {
    it('defines curated project arcade cards with media and links', () => {
        expect(PROJECT_CASE_STUDIES.length).toBeGreaterThanOrEqual(4);
        expect(PROJECT_CASE_STUDIES.map((project) => project.slug)).toEqual([
            'montaos',
            'hello-neighbor',
            'ai-manga-studio',
            'codeharbor-ai',
        ]);

        PROJECT_CASE_STUDIES.forEach((project) => {
            expect(project.slug).toBeTruthy();
            expect(project.stack.length).toBeGreaterThan(0);
            expect(project.buildHighlights.length).toBeGreaterThan(0);
            expect(project.media.length).toBeGreaterThan(0);
            expect(project.links.length).toBeGreaterThan(0);
        });

        expect(
            PROJECT_CASE_STUDIES.flatMap((project) =>
                project.links.map((link) => link.href)
            )
        ).toEqual(
            expect.arrayContaining([
                'https://github.com/MontaCoder/HelloNeighbor-community-web-application',
                'https://github.com/MontaCoder/AI-Manga-Studio',
                'https://github.com/MontaCoder/CodeHarborAI',
            ])
        );
    });
});
