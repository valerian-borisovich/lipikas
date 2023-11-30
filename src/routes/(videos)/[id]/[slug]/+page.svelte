<script lang="ts">
    import type { PageServerData } from "./$types";
    import { enhance } from "$app/forms";

    export let data: PageServerData;

    let dialog: HTMLDialogElement;
</script>

<svelte:head>
    <title>{data.video?.title}</title>
</svelte:head>

<article>
    <div class="flex justify-between items-center border-b border-base-300 pb-3 mb-3">
        <div class="title font-bold">{data.video?.title}</div>
        <div class="inline-flex gap-3">
            <a href="/{data.video?.id}/edit" title="Edit Note" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
            <button title="Delete Note" class="text-gray-500" on:click={() => dialog.show()}><i class="bi bi-trash"></i></button>
        </div>
    </div>

    {#if data.video?.photo}
        <div class="flex justify-center mb-3">
            <img src="/images/{data.video?.photo}" alt="{data.video?.title}">
        </div>
    {/if}

    <div class="content prose max-w-none mb-3">
        {@html data.video?.contentToHtml}
    </div>

    {#if data.video?.tags}
        <div class="flex justify-center gap-3">
            {#each data.video?.tags as tag}
                <div class="badge badge-ghost">
                    <a href="/tag/{tag.slug}">{tag.name}</a>
                </div>
            {/each}
        </div>
    {/if}
</article>

<dialog bind:this={dialog} class="modal">
    <form action="/{data.video?.id}/delete" method="POST" class="modal-box" use:enhance>
        <h3 class="font-bold text-lg">Confirm</h3>
        <p class="py-4">Delete this note?</p>
        <div class="modal-action">
            <button type="submit" class="btn btn-error btn-sm">Yes</button>
            <button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
        </div>
    </form>
</dialog>
