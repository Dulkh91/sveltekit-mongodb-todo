<script lang="ts">
  import AuthForm from '$lib/components/AuthForm.svelte';
  import { page } from '$app/stores';
  import { resolve } from '$app/paths';
</script>

<div class=" min-h-screen flex flex-col justify-center items-center bg-gray-100">
  <h1 class=" mb-8 text-gray-800">ចុះឈ្មោះប្រើប្រាស់</h1>
  <AuthForm form={$page.form} type="register" />
  
  <p class=" mt-4 text-gray-500">
    មានគណនីរួចហើយ? 
    <a href={resolve('/login')} class=" text-blue-500 no-underline hover:underline">ចូលប្រើ</a>
  </p>
</div>

