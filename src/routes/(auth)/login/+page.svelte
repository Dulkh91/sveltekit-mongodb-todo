
<script lang="ts">
  import AuthForm from '$lib/components/AuthForm.svelte';
  import { resolve } from '$app/paths';
  import {page} from '$app/stores'
	
</script>

<div class=" min-h-screen flex flex-col justify-center items-center bg-gray-100">
  <h1 class=" mt-8 text-gray-800">ចូលប្រើប្រព័ន្ធ</h1>
  <AuthForm  form={$page.form} type="login" />
  
  <p class=" mt-4 text-gray-500">
    មិនទាន់មានគណនីទេ? 
    <a href={resolve("/register")} class=" text-blue-500 no-underline hover:underline">ចុះឈ្មោះ</a>
  </p>
</div>

