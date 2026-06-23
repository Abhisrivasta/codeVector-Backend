import pool from "../config/db.js";

export const getProductsService = async ({
  limit = 20,
  category,
  cursorCreatedAt,
  cursorId,
  snapshotAt,
}) => {
  limit = Math.min(Math.max(Number(limit), 1), 100);

  const snapshot = snapshotAt || new Date().toISOString();

  const params = [];
  const conditions = [];

  params.push(snapshot);
  conditions.push(`created_at <= $${params.length}`);

  if (category) {
    params.push(category);
    conditions.push(`category = $${params.length}`);
  }

  if (cursorCreatedAt && cursorId) {
    params.push(cursorCreatedAt);
    params.push(cursorId);
    conditions.push(`(created_at, id) < ($${params.length - 1}, $${params.length})`);
  }

  params.push(limit);

  const query = `
    SELECT id, name, category, price, created_at, updated_at
    FROM products
    WHERE ${conditions.join(" AND ")}
    ORDER BY created_at DESC, id DESC
    LIMIT $${params.length}
  `;

  const { rows } = await pool.query(query, params);

  const nextCursor = rows.length === limit ? {
    created_at: rows[rows.length - 1].created_at,
    id: rows[rows.length - 1].id,
  } : null;

  return {
    success: true,
    count: rows.length,
    snapshotAt: snapshot,
    nextCursor,
    data: rows,
  };
};