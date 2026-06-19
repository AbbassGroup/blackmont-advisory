export interface BrokerOption {
  name: string;
  email: string;
}

/**
 * Shared broker roster used by the listing and proposal admin forms
 * (name + email). Single source of truth — import this rather than
 * re-declaring a local `BROKERS` array.
 */
export const BROKERS: BrokerOption[] = [
  { name: 'Tester', email: 'mohammadjahid0007@gmail.com' },
  { name: 'Sadeq Abbass', email: 'sadeq@blackmontadvisory.com' },
  { name: 'Asif Ahammed', email: 'asif.ahammed@blackmontadvisory.com' },
  { name: 'Christine Lamani', email: 'christine.lamani@blackmontadvisory.com' },
  { name: 'Freddie Wong', email: 'freddie.wong@blackmontadvisory.com' },
  { name: 'Igor Vasiliev', email: 'igor.vasiliev@blackmontadvisory.com' },
  { name: 'Hicham Nahas', email: 'hicham.nahas@blackmontadvisory.com' },
  { name: 'Fiona Johns', email: 'fiona@blackmontadvisory.com' },
];
