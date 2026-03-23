<script lang="ts">
    import type { PageProps } from './$types';
    import {enhance} from '$app/forms'

    let { data }: PageProps = $props();
    let priority = "low"; // default ជ្រើស

</script>

<div class=" flex flex-col justify-center items-center mx-auto">
<h1 class=" text-gray-500">បញ្ចូល TODO ថ្មី</h1>
    <form method="POST"  class=" w-full mt-4"  use:enhance >
        <input type="text" name="addtodo" class=" w-full rounded-md" placeholder="បញ្ចូលអក្សរទីនេះ..." required>

        <textarea name="description" placeholder="សេចក្តីលម្អិត (មិនចាំបាច់)" rows="1" class=" w-full mt-2 min-h-20 field-sizing-content" ></textarea>
        
        <select name="priority" id="priority" class=" block w-full bg-neutral-200 rounded-md border border-gray-300">
            <option value="low">អាទិភាពទាប</option>
            <option value="mediam">អាទិភាពមធ្យម</option>
            <option value="high">អាទិភាពខ្ពស់</option>
        </select>

        <input type="date" name="dueDate">
        <button class=" mt-2 bg-blue-500 hover:bg-blue-600 px-16 py-2 rounded-md text-gray-100 cursor-pointer" type="submit"> 
            បន្ថែម
        </button>
    </form>
    
</div>

