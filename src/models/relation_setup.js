export default async ({ models }) => {
	const { items, item_category, transaction } = models;

	items.hasOne(item_category, {
		foreignKey: "id",
		sourceKey: "category_id",
		as: "item_category",
	});

	items.hasMany(transaction, {
		foreignKey: "item_id",
		sourceKey: "id",
		as: "transactions",
	});

	item_category.hasMany(items, {
		foreignKey: "category_id",
		sourceKey: "id",
		as: "items",
	});

	transaction.hasOne(items, {
		foreignKey: "id",
		sourceKey: "item_id",
		as: "item",
	});
};
