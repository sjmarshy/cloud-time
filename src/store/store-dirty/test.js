import test from 'ava';
import td from 'testdouble';

import dirtyAdaptor from './';

const db = td.object(['get', 'set']);

const isPromise = p => Promise.resolve(p) === p;

const username = 'sjm';
const time = 123456;
const key = `${username}:${time}`;

test.afterEach(() => td.reset());

test('Dirty Storage -> return Promises', t => {
  const dirty = dirtyAdaptor(db);

  t.true(isPromise(dirty.get(username, time)));
  t.true(isPromise(dirty.set(username, time)));
});

test('Dirty Storage -> set', t => {
  const dirty = dirtyAdaptor(db);
  const tags = 'dirty test';

  dirty.set(username, time, tags);

  td.verify(db.set(key, tags, td.matchers.isA(Function)));
  t.pass();
});

test('Dirty Storage -> get', t => {
  const dirty = dirtyAdaptor(db);

  const tags = 'dirty test';
  td.when(db.get(key)).thenReturn(tags);

  return dirty.get(username, time).then(result => {
    t.is(result, tags);
  });
});
