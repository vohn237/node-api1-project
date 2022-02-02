exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('accounts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        { name: 'Devohn', budget: 1000 },
        { name: 'Gordon', budget: 2000 },
        { name: 'Toni', budget: 3000 },
      ]);
    });
};
