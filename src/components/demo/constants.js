import { getServer } from "../../utils";

export const DEFAULT_TEST_AD = 'npxnGGbGQU';
export const DEFAULT_TEST_ADVERTISER = 'CuZ12kuI';
export const DEFAULT_PROD_AD = 'GLQF2FYz9A';
export const DEFAULT_PROD_ADVERTISER = 'vEUNpJEw';
export const DEFAULT_TEST_SOCIAL_AD = 'PSMNJt1XyR';
export const DEFAULT_TEST_SOCIAL_ADVERTISER = 'CuZ12kuI';
export const DEFAULT_PROD_SOCIAL_AD = 'R5mqehx7';
export const DEFAULT_PROD_SOCIAL_ADVERTISER = 'dRH9DGbj';

export const DEFAULT_AD = getServer().match(/^(test|local)/) ? DEFAULT_TEST_AD : DEFAULT_PROD_AD;

// Server type overrides for the default demo ads
export const serverTypeForAd = {
	[DEFAULT_PROD_SOCIAL_AD]: 'prod',
	[DEFAULT_PROD_AD]: 'prod',
	[DEFAULT_TEST_SOCIAL_AD]: 'test',
	[DEFAULT_TEST_AD]: 'test',
};
