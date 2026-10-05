<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- Keep shared editorial reveal and section-heading patterns in `src/components/site/Editorial.tsx` so story and support pages stay visually consistent.
- Keep the first-load experience in `SoundLoader.tsx` as a full-viewport tactical HUD while `BootSplash.tsx` owns session timing and dismissal, so visuals and lifecycle remain independently maintainable.
