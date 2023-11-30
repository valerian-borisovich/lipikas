<script lang='ts'>
  import type { PageServerData } from './$types'
  // import Menu from '$lib/components/menu.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Navigation from '$lib/components/navigation.svelte'
  import Search from '$lib/components/search.svelte'
  import Videos from '$lib/components/videos.svelte'

  export let data: PageServerData
  let gl = data.gl
</script>

<svelte:head>
  <title>Lipikas</title>
</svelte:head>

<Search />


<!--
<Menu />

// import Countries from "$lib/components/countries.svelte"

<div class='p-6'>
  <form action='/' method='get'>
    <div class='flex gap-3'>
      <select bind:value={gl} name='gl' class='select select-bordered w-full'>
        {#each data.countries as country}
          <option value={country.gl}>{country.name}</option>
        {/each}
      </select>
      <button type='submit' class='btn btn-neutral'>Change</button>
    </div>
  </form>
</div>
-->

<Videos videos={data.videos} />

<Navigation href='/?' prevPage={data.prevPage} nextPage={data.nextPage} />

<Footer />
