CREATE TABLE IF NOT EXISTS orders (
  id          BIGSERIAL PRIMARY KEY,
  order_id    TEXT NOT NULL UNIQUE,
  phone       TEXT NOT NULL,
  order_desc  TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
ON orders
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated reads"
ON orders
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated updates"
ON orders
FOR UPDATE
TO authenticated
USING (true);