<script lang="ts">
    export let q: string = '';
    export let local: string = '0';
</script>

<div class="mb-6">
    <form method="GET" action="/search">
        <div class="form-control">
            <div class="join join-horizontal">
                <input type="text" name="q" value="{q}" class="input input-bordered w-full join-item" required>
                <button type="submit" class="btn btn-primary join-item">Search</button>
            </div>
        </div>
        <input type="checkbox" name="local" value="{local}" class=""> search in local DB
    </form>
</div>
