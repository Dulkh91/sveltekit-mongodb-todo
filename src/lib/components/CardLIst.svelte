
<script lang="ts">
    
    let {totoProps = [], onAction} = $props()

    import Icon  from '@iconify/svelte';
    
</script>

<!-- {console.log(totoProps)} -->
{#each totoProps as todo (todo._id)}
   <div class=" bg-cyan-500 rounded-md p-2 flex justify-between shadow-lg mb-2">
            <div>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
            </div>
            <div class=" flex items-center">
                <p>{todo.createdAt}</p>
                
                
                <button class=" hover:bg-gray-300/50  p-1 rounded-full" onclick={()=> onAction?.('more', todo._id)}>
                   <Icon icon="nrk:more" width="24"/>
                </button>
            </div>
            
 </div> 
{/each}


 