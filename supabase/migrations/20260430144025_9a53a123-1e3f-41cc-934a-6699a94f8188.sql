revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user_admin() from public, anon, authenticated;
revoke execute on function public.enforce_pending_on_insert() from public, anon, authenticated;