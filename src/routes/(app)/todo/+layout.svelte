<script lang="ts">
	import { resolve } from '$app/paths';
    import Model from '$lib/components/Model.svelte';
    
import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>
<div class=" bg-amber-800 w-full" >
<nav class=" bg-emerald-300">
    <div class=" container p-5 mx-auto flex justify-between">
        <button>Home</button>
        <form action="/logout" method="post">
            <button type="submit" class="px-10 py-2 rounded-md bg-amber-600">Log Out</button>
        </form>
    </div>
</nav>
    <div class=" bg-lime-600 rounded-full fixed bottom-10 right-10 w-14 h-14 flex justify-center items-center">
        <a href={resolve('/add-todo')}>
            Add 
        </a>
    </div>
 {@render children()}
</div>