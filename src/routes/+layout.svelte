<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "./$types";
    import { page } from "$app/stores";

    import "../app.css";
    import "nprogress/nprogress.css";

    import { navigating } from "$app/stores";
    import NProgress from "nprogress";

    NProgress.configure({ minimum: 0.16 });
    $: {
        if ($navigating) {
            NProgress.start();
        }
        if (!$navigating) {
            NProgress.done();
        }
    }

    const updateTheme: SubmitFunction = ({ action }) => {
        const theme = action.searchParams.get('theme');
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
    let showSearchForm = false;
</script>

<!--
/*

<svelte:head>
    <title>Asikin</title>
</svelte:head>

<nav class="navbar bg-base-300">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">
            <img src="/logo.png" alt="[]" class="w-6 h-6" />
            Asikin
        </a>
    </div>
    <div class="flex-none">
        <button
          class="btn btn-sm btn-neutral"
          on:click={() => (showSearchForm = !showSearchForm)}
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
            </svg>
        </button>
    </div>
</nav>

{#if showSearchForm}
    <div
      id="search"
      class="absolute top-19 left-1/2 transform -translate-x-1/2 w-full md:w-3/5 p-6 bg-base-300 rounded"
    >
        <form
          action="/search"
          method="get"
          on:submit={() => (showSearchForm = false)}
        >
            <div class="flex gap-3">
                <input
                  type="text"
                  name="q"
                  class="input input-bordered w-full"
                />
                <button type="submit" class="btn btn-neutral">Search</button>
            </div>
        </form>
    </div>
{/if}

<main class="w-full md:w-4/5 mx-auto">
    <slot />
</main>

<footer class="flex justify-center my-6">
    <a href="https://s.id/ronsen" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-code-slash"
          viewBox="0 0 16 16"
        >
            <path
              d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
            />
        </svg>
    </a>
</footer>

<div class="fixed right-4 bottom-4">
    <button class="btn btn-neutral rounded-full shadow" on:click={() => document.body.scrollIntoView()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-up"
          viewBox="0 0 16 16"
        >
            <path
              fill-rule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
        </svg>
    </button>
</div>
-->

<main class="container md:w-3/5 px-8 mx-auto my-8">
    <div class="flex justify-between items-center border-b border-primary pb-2 mb-8">
        <h1 class="font-bold uppercase"><a href="/">Catatan</a></h1>

        <div class="inline-flex items-center gap-3">
            <form method="post" class="form-control" use:enhance={updateTheme}>
                <div class="dropdown dropdown-end">
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label tabindex="0" class="btn btn-sm btn-ghost rounded-btn"><i class="bi bi-sun"></i></label>
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-52 mt-4">
                        <li><button formaction="/?theme=light&redirectTo={$page.url.pathname}">Light</button></li>
                        <li><button formaction="/?theme=dark&redirectTo={$page.url.pathname}">Dark</button></li>
                    </ul>
                </div>
            </form>

            {#if $page.data.user}
                <a href="/add" title="Add New Note"><i class="bi bi-plus-circle"></i></a>
                <a href="/settings" title="Settings"><i class="bi bi-gear"></i></a>
            {/if}

            {#if !$page.data.user}
                <a href="/login" title="Sign In"><i class="bi bi-box-arrow-in-right"></i></a>
            {:else}
                <form method="POST" action="/logout">
                    <button type="submit" title="Sign Out"><i class="bi bi-box-arrow-right"></i></button>
                </form>
            {/if}
        </div>
    </div>

    <slot />
</main>
