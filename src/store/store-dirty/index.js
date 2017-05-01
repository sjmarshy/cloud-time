function makeKey(username, time) {
  return `${username}:${time}`;
}

export default db => {
  const set = (username, time, tags) =>
    new Promise((resolve, reject) => {
      db.set(makeKey(username, time), tags, err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });

  const get = (username, time) => Promise.resolve(db.get(makeKey(username, time)));

  return {
    set,
    get,
  };
};
