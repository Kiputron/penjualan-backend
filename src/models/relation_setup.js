export default async ({ models }) => {
	const { items, item_category } = models;

	items.hasOne(item_category, {
		foreignKey: "id",
		sourceKey: "category_id",
		as: "item_category",
	});
};
