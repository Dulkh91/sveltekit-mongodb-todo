<script lang="ts">
  let { form = null, type = 'login' } = $props();
</script>

<form method="POST" class="auth-form">
  {#if type === 'register'}
    <div class="form-group">
      <label for="name">ឈ្មោះពេញ</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        value={form?.name || ''}
        required
      />
    </div>
  {/if}

  <div class="form-group">
    <label for="email">អ៊ីមែល</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      value={form?.email || ''}
      required
    />
  </div>

  <div class="form-group">
    <label for="password">ពាក្យសម្ងាត់</label>
    <input 
      type="password" 
      id="password" 
      name="password" 
      required
    />
  </div>

  {#if type === 'register'}
    <div class="form-group">
      <label for="confirmPassword">បញ្ជាក់ពាក្យសម្ងាត់</label>
      <input 
        type="password" 
        id="confirmPassword" 
        name="confirmPassword" 
        required
      />
    </div>
  {/if}

  {#if form?.error}
    <div class="error-message">
      {form.error}
    </div>
  {/if}

  <button type="submit" class="submit-btn">
    {type === 'login' ? 'ចូលប្រើ' : 'ចុះឈ្មោះ'}
  </button>
</form>







<style>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .submit-btn:hover {
    background-color: #2563eb;
  }

  .error-message {
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    color: #dc2626;
    font-size: 0.875rem;
  }
</style>