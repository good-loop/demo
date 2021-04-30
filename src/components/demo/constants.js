export const DEFAULT_TEST_AD = 'FKXON7w1oZ';
export const DEFAULT_TEST_ADVERTISER = 'CuZ12kuI';
export const DEFAULT_PROD_AD = 'GLQF2FYz9A';
export const DEFAULT_PROD_ADVERTISER = 'vEUNpJEw';

export const DEFAULT_AD = window.location.hostname.match(/^(test|local)/) ? DEFAULT_TEST_AD : DEFAULT_PROD_AD;
