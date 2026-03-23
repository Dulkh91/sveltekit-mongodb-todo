<script lang="ts">
	import { resolve } from '$app/paths'
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>

<div class="container m-5 p-6 mx-auto">
    {@render children()}
    

    <div class=" absolute bottom-15 right-20">
        <a href={resolve('/todo')}>Back</a>
       
    </div>
</div>