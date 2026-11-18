import { describe, expect, it } from 'vitest';
import {
  calcShipping,
  LOWER_MAINLAND_FSAS,
  parsePostalCode,
  resolveDestination,
  ShippingError,
  zoneFromPostal,
} from './shipping.js';

describe('parsePostalCode', () => {
  it('accepts Canadian postal codes with or without a space', () => {
    expect(parsePostalCode('V4N 6Y1')).toEqual({
      country: 'CA',
      normalized: 'V4N 6Y1',
      fsa: 'V4N',
      firstLetter: 'V',
    });
    expect(parsePostalCode('v4n6y1')).toEqual(parsePostalCode('V4N 6Y1'));
    expect(parsePostalCode('  m5v 2t6 ')).toEqual({
      country: 'CA',
      normalized: 'M5V 2T6',
      fsa: 'M5V',
      firstLetter: 'M',
    });
  });

  it('accepts US ZIP codes of 5 or 9 digits', () => {
    expect(parsePostalCode('90210')).toEqual({ country: 'US', normalized: '90210', zip5: '90210' });
    expect(parsePostalCode('90210-1234')).toEqual({
      country: 'US',
      normalized: '90210-1234',
      zip5: '90210',
    });
  });

  it('rejects invalid codes', () => {
    expect(parsePostalCode('')).toBeNull();
    expect(parsePostalCode('ABC')).toBeNull();
    expect(parsePostalCode('D1A 1A1')).toBeNull(); // D is not a Canadian first letter
    expect(parsePostalCode('1234')).toBeNull();
    expect(parsePostalCode('123456')).toBeNull();
  });
});

describe('zoneFromPostal', () => {
  const zone = (code: string) => zoneFromPostal(parsePostalCode(code)!);

  it('maps Lower Mainland / Metro Vancouver FSAs, including Surrey V4N', () => {
    expect(zone('V4N 6Y1')).toBe('metro-vancouver');
    expect(zone('V6B 1A1')).toBe('metro-vancouver');
    expect(zone('V3A 4K2')).toBe('metro-vancouver');
    expect(zone('V2S 1A1')).toBe('metro-vancouver'); // Abbotsford
    expect(LOWER_MAINLAND_FSAS.has('V4N')).toBe(true);
  });

  it('maps other BC codes, including V4T (West Kelowna), to rest of BC', () => {
    expect(zone('V4T 1A1')).toBe('bc');
    expect(zone('V8V 1A1')).toBe('bc'); // Victoria
    expect(zone('V1Y 1A1')).toBe('bc'); // Kelowna
    expect(zone('V0N 1A0')).toBe('bc'); // rural / Sea-to-Sky
  });

  it('maps Western Canada, Eastern Canada, Territories and the US', () => {
    expect(zone('T2P 1A1')).toBe('western'); // Alberta
    expect(zone('S7K 1A1')).toBe('western'); // Saskatchewan
    expect(zone('R3C 1A1')).toBe('western'); // Manitoba
    expect(zone('M5V 2T6')).toBe('eastern'); // Ontario
    expect(zone('H2Y 1A1')).toBe('eastern'); // Quebec
    expect(zone('B3H 1A1')).toBe('eastern'); // Nova Scotia
    expect(zone('A1C 1A1')).toBe('eastern'); // Newfoundland
    expect(zone('X0E 1A0')).toBe('territories');
    expect(zone('Y1A 1A1')).toBe('territories');
    expect(zone('90210')).toBe('usa');
    expect(zone('10001-2345')).toBe('usa');
  });
});

describe('calcShipping', () => {
  it('makes local pickup free and does not require a postal code', () => {
    const r = calcShipping({ method: 'pickup' }, 0);
    expect(r.cents).toBe(0);
    expect(r.free).toBe(true);
    expect(r.zone).toBe('pickup');
  });

  it('uses the placeholder zone rate, and free shipping above the threshold', () => {
    const paid = calcShipping({ method: 'ship', postalCode: 'V4N 6Y1' }, 1000);
    expect(paid.zone).toBe('metro-vancouver');
    expect(paid.cents).toBe(800);
    expect(paid.free).toBe(false);

    const free = calcShipping({ method: 'ship', postalCode: 'V4N 6Y1' }, 12000);
    expect(free.cents).toBe(0);
    expect(free.free).toBe(true);

    expect(calcShipping({ method: 'ship', postalCode: '90210' }, 1_000_000).free).toBe(false);
    expect(calcShipping({ method: 'ship', postalCode: '90210' }, 1000).cents).toBe(2500);
  });

  it('rejects a missing or invalid postal code for shipment', () => {
    expect(() => calcShipping({ method: 'ship', postalCode: '' }, 1000)).toThrow(ShippingError);
    expect(() => calcShipping({ method: 'ship', postalCode: 'nope' }, 1000)).toThrow(ShippingError);
  });

  it('exposes the normalized postal code and region for the Square form', () => {
    const dest = resolveDestination({ method: 'ship', postalCode: 'v4n6y1' });
    expect(dest.postal?.normalized).toBe('V4N 6Y1');
    expect(dest.regionCode).toBe('BC');
    expect(resolveDestination({ method: 'ship', postalCode: '10001' }).regionCode).toBeNull();
  });
});
