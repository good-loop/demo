export const DEFAULT_TEST_AD = 'FKXON7w1oZ';
export const DEFAULT_TEST_ADVERTISER = 'CuZ12kuI';
export const DEFAULT_PROD_AD = 'Of0Vpbg2Ct';
export const DEFAULT_PROD_ADVERTISER = 'UzzQ3V22';

export const DEFAULT_AD = window.location.hostname.match(/^(test|local)/) ? DEFAULT_TEST_AD : DEFAULT_PROD_AD;
