<script lang="ts">
    import {enhance} from '$app/forms'
	import { resolve } from '$app/paths';
    let {selectedId, onClose, isOpen} = $props()
</script>

{#if  isOpen}
    <div class=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800/60 ">
        <div class=" w-60 h-52 bg-gray-100 rounded-lg flex flex-col justify-between ">
            <div class=" bg-fuchsia-500 rounded-t-lg py-2 flex justify-center">
                <h1 class=" mx-3 text-gray-200 text-lg ">តើអ្នកចង់</h1>

            </div>
            <div class=" flex justify-around items-center">
                <form method="POST" action="/todo/delete" onsubmit={(e) => confirm('តើអ្នកប្រាកដជាចង់លុបកិច្ចការនេះ?') || e.preventDefault()}>
                    <input type="hidden" name="todoDeleteId" value={selectedId}>
                    <button  class=" text-white bg-red-500 px-8 py-2 rounded-md" >
                        Delete
                    </button>
                </form>
                
                <a href={resolve(`/update-todo?id=${selectedId}`)} class=" text-white bg-blue-600 px-8 py-2 rounded-md">
                    Edit
                </a>
            </div>
            <div >
                <button class=" bg-amber-400 text-white p-2 w-full rounded-b-lg" onclick={()=> onClose(false)}>
                     បោះបង់
                </button>
            </div>

        </div>
        
</div>
{/if}