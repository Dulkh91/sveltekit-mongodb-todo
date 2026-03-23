<script lang="ts">
    import type { PageProps } from './$types';
    import CardLIst from '$lib/components/CardLIst.svelte';
    let { data }: PageProps = $props();
    import Model from '$lib/components/Model.svelte';

    let selectedId:string | null = $state(null) 
    let isOpen:boolean = $state(false)

    function handleAction(action: string, id: string){
        if(action === 'more'){
            selectedId = id
            isOpen = true
        }
    }
    function closeModel(){
        isOpen = false
    }
    

</script>

<div class="container flex justify-center mx-auto min-h-screen bg-slate-400">
	<div class="m-6 p-5 w-full">
        <CardLIst totoProps={data.todos} onAction={handleAction} />
    </div>
     <div class=" absolute">
        <Model {selectedId} {isOpen} onClose={closeModel} />
    </div>
  
</div>