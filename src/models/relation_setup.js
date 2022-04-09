export default async ({ models }) => {
	const { items, item_category, transaction } = models;

	items.hasOne(item_category, {
		foreignKey: "id",
		sourceKey: "category_id",
		as: "item_category",
	});
	transaction.hasOne(items, {
		foreignKey: "id",
		sourceKey: "item_id",
		as: "item",
	});
};
