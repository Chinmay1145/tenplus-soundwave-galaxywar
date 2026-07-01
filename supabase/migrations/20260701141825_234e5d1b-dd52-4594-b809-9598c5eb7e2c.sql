
-- Allow owners to update their own orders (needed for simulate/status advance)
CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Secure lookup: match by order-id prefix + account email
CREATE OR REPLACE FUNCTION public.lookup_order(_order_id_prefix text, _email text)
RETURNS SETOF public.orders
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT o.*
  FROM public.orders o
  JOIN auth.users u ON u.id = o.user_id
  WHERE lower(u.email) = lower(trim(_email))
    AND o.id::text ILIKE lower(trim(_order_id_prefix)) || '%'
  ORDER BY o.created_at DESC
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.lookup_order(text, text) TO anon, authenticated;

-- Allow status advance via the same lookup (returns updated row)
CREATE OR REPLACE FUNCTION public.advance_order_status(_order_id uuid, _email text, _next_status text)
RETURNS SETOF public.orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _next_status NOT IN ('confirmed','packed','shipped','out_for_delivery','delivered') THEN
    RAISE EXCEPTION 'invalid status';
  END IF;
  RETURN QUERY
    UPDATE public.orders o
    SET status = _next_status
    FROM auth.users u
    WHERE o.id = _order_id
      AND o.user_id = u.id
      AND lower(u.email) = lower(trim(_email))
    RETURNING o.*;
END;
$$;

GRANT EXECUTE ON FUNCTION public.advance_order_status(uuid, text, text) TO anon, authenticated;
