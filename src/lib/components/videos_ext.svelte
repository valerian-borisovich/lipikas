<script lang="ts">
    import Alert from "$lib/components/alert.svelte";
    import { enhance } from "$app/forms";
    import type { Video } from "@prisma/client";

    export let videos: Video[];

    let dialog: HTMLDialogElement;
    let action: string = '';

    const destroy = (video: Video) => {
        action = '/' + video.id + '/delete';
        dialog.show();
    };
</script>

{#if (videos.length == 0)}
    <Alert>Empty.</Alert>
{:else}
    <div class="notes mb-6">
        {#each videos as video}
            <div class="note flex justify-between items-baseline border-b border-base-300 pb-2 mb-2">
                <div class="note-title">
                    <a href="/{video.id}/{video.slug}">{video.title}</a>
                </div>
                <div class="inline-flex gap-3">
                    <a href="/{video.id}/edit" title="Edit Note" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
                    <button title="Delete Note" class="text-gray-500" on:click={() => destroy(video)}><i class="bi bi-trash"></i></button>
                </div>
            </div>
        {/each}
    </div>
{/if}

<dialog bind:this={dialog} class="modal">
    <form {action} method="POST" class="modal-box" on:submit|preventDefault={() => dialog.close()} use:enhance>
        <h3 class="font-bold text-lg">Confirm</h3>
        <p class="py-4">Delete this note?</p>
        <div class="modal-action">
            <button type="submit" class="btn btn-error btn-sm">Yes</button>
            <button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
        </div>
    </form>
</dialog>
