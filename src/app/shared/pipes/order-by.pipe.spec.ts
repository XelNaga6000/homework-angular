import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let orderByPipe: OrderByPipe;

  beforeEach(() => {
    orderByPipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(orderByPipe).toBeTruthy();
  });

  it('check transform with empty or wrong value', () => {
    expect(orderByPipe.transform(null, 'key')).toEqual([]);
    expect(orderByPipe.transform(undefined, 'key')).toEqual([]);
    expect(orderByPipe.transform([], 'key')).toEqual([]);
  });

  it('check transform with empty or wrong key', () => {
    const items = [{a: 1, b: 2}];

    expect(orderByPipe.transform(items, undefined)).toEqual(items);
    expect(orderByPipe.transform(items, null)).toEqual(items);
    expect(orderByPipe.transform(items, '')).toEqual(items);
    expect(orderByPipe.transform(items, 'aaa')).toEqual(items);
  });

  it('sort array of objects by key', () => {
    const items = [{a: 1, b: 'ccc'}, {a: 2, b: 'aaa'}, {a: 3, b: 'bbb'}];

    expect(orderByPipe.transform(items, 'a', false)).toEqual([...items].reverse());
    expect(orderByPipe.transform(items, 'a', true)).toEqual(items);

    expect(orderByPipe.transform(items, 'b', false)).toEqual([items[0], items[2], items[1]]);
    expect(orderByPipe.transform(items, 'b', true)).toEqual([items[1], items[2], items[0]]);
  });

  it('sort array of objects by complex key', () => {
    const items = [{
        a: {a: 1},
        b: {b: 'ccc'}
      } , {
        a: {a: 2},
        b: {b: 'aaa'}
      } , {
        a: {a: 3},
        b: {b: 'bbb'}
      }
    ];

    expect(orderByPipe.transform(items, 'a.a', false)).toEqual([...items].reverse());
    expect(orderByPipe.transform(items, 'a.a', true)).toEqual(items);

    expect(orderByPipe.transform(items, 'b.b', false)).toEqual([items[0], items[2], items[1]]);
    expect(orderByPipe.transform(items, 'b.b', true)).toEqual([items[1], items[2], items[0]]);
  });
});
