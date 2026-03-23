<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    // state update form
    const title = $state(data.todo?.title || '')
    const description = $state(data.todo?.description || '')
    const priority = $state(data.todo?.priority || 'mediam')

    
</script>

<div class=" flex flex-col justify-center items-center mx-auto">
<h1 class=" text-gray-500">កែប្រែ TODO </h1>
    <form method="POST"  class=" w-full mt-4"  use:enhance >
        <input type="hidden" name="todoId" value={data.todo?._id}/>
        <input type="text" name="title" class=" w-full rounded-md" placeholder="បញ្ចូលអក្សរទីនេះ..." value={title} required>

        <textarea name="description" placeholder="សេចក្តីលម្អិត (មិនចាំបាច់)" rows="1" class=" w-full mt-2 min-h-20 field-sizing-content" value={description} ></textarea>
        
        <select name="priority" id="priority" class=" block w-full bg-neutral-200 rounded-md border border-gray-300" value={priority}>
            <option value="low">អាទិភាពទាប</option>
            <option value="mediam">អាទិភាពមធ្យម</option>
            <option value="high">អាទិភាពខ្ពស់</option>
        </select>

        <button class=" mt-2 bg-blue-500 hover:bg-blue-600 px-16 py-2 rounded-md text-gray-100 cursor-pointer" type="submit"> 
            Update
        </button>
    </form>
    
</div>


